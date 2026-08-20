#!/usr/bin/env python3
import json
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path


BASE = "http://127.0.0.1:23119/api/users/0"
DEFAULT_COLLECTION_KEY = "7RG9SIEU"
DEFAULT_OUT_DIR = Path("/tmp/zotero-review")


def api_json(path, params=None):
    query = urllib.parse.urlencode(params or {})
    url = f"{BASE}{path}"
    if query:
        url = f"{url}?{query}"
    with urllib.request.urlopen(url, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def paged(path, params=None):
    params = dict(params or {})
    params.setdefault("limit", 100)
    start = 0
    out = []
    while True:
        page_params = dict(params)
        page_params["start"] = start
        page = api_json(path, page_params)
        out.extend(page)
        if len(page) < page_params["limit"]:
            break
        start += page_params["limit"]
    return out


def collection_tree(collections, root_key):
    by_parent = {}
    by_key = {}
    for item in collections:
        data = item["data"]
        by_key[data["key"]] = data
        by_parent.setdefault(data.get("parentCollection"), []).append(data["key"])

    keys = []
    stack = [root_key]
    while stack:
        key = stack.pop()
        keys.append(key)
        stack.extend(reversed(by_parent.get(key, [])))
    return keys, by_key


def compact_item(item, collection_names):
    data = item["data"]
    creators = data.get("creators") or []
    author = "未报告"
    if creators:
        first = creators[0]
        author = first.get("lastName") or first.get("name") or "未报告"
    year = (item.get("meta", {}).get("parsedDate") or data.get("date") or "")[:4] or "未报告"
    venue = (
        data.get("publicationTitle")
        or data.get("proceedingsTitle")
        or data.get("conferenceName")
        or data.get("publisher")
        or data.get("libraryCatalog")
        or "未报告"
    )
    return {
        "key": data["key"],
        "title": data.get("title", ""),
        "itemType": data.get("itemType", ""),
        "author_year": f"{author} ({year})",
        "venue": venue,
        "date": data.get("date", ""),
        "doi": data.get("DOI", ""),
        "url": data.get("url", ""),
        "abstract": data.get("abstractNote", ""),
        "collections": [
            {"key": key, "name": collection_names.get(key, key)}
            for key in data.get("collections", [])
        ],
        "numChildren": item.get("meta", {}).get("numChildren", 0),
    }


def main():
    collection_key = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_COLLECTION_KEY
    out_dir = Path(sys.argv[2]) if len(sys.argv) > 2 else DEFAULT_OUT_DIR
    out_dir.mkdir(parents=True, exist_ok=True)
    collections = paged("/collections", {"include": "data"})
    keys, by_key = collection_tree(collections, collection_key)
    collection_names = {k: v.get("name", k) for k, v in by_key.items()}

    parent_items = {}
    item_collections = {}
    for collection_key in keys:
        items = paged(
            f"/collections/{collection_key}/items/top",
            {"include": "data"},
        )
        for item in items:
            data = item.get("data", {})
            if data.get("itemType") == "attachment":
                continue
            parent_items[data["key"]] = item
            item_collections.setdefault(data["key"], set()).add(collection_key)

    records = []
    for key, item in sorted(parent_items.items(), key=lambda pair: pair[1]["data"].get("title", "").lower()):
        row = compact_item(item, collection_names)
        row["review_tree_collections"] = [
            {"key": c, "name": collection_names.get(c, c)}
            for c in sorted(item_collections.get(key, []), key=lambda k: collection_names.get(k, k))
        ]
        children = paged(f"/items/{key}/children", {"include": "data"})
        attachments = []
        for child in children:
            data = child.get("data", {})
            if data.get("itemType") != "attachment":
                continue
            att = {
                "key": data["key"],
                "title": data.get("title", ""),
                "contentType": data.get("contentType", ""),
                "filename": data.get("filename", ""),
            }
            try:
                fulltext = api_json(f"/items/{data['key']}/fulltext")
                att["fulltext"] = fulltext
            except urllib.error.HTTPError as exc:
                att["fulltext_error"] = f"HTTP {exc.code}"
            attachments.append(att)
        row["attachments"] = attachments
        records.append(row)

    summary = {
        "review_key": collection_key,
        "review_name": collection_names.get(collection_key, collection_key),
        "review_collections": [{"key": k, "name": collection_names.get(k, k)} for k in keys],
        "item_count": len(records),
        "records": records,
    }
    out_path = out_dir / "inventory.json"
    out_path.write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({
        "out": str(out_path),
        "collections": len(keys),
        "items": len(records),
        "with_attachments": sum(1 for r in records if r["attachments"]),
        "with_indexed_fulltext": sum(
            1
            for r in records
            for a in r["attachments"]
            if a.get("fulltext", {}).get("content")
        ),
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"error: {exc}", file=sys.stderr)
        raise
