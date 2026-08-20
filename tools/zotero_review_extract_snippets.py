#!/usr/bin/env python3
import json
import re
import sys
from pathlib import Path


KEYWORDS = [
    "systematic literature review",
    "systematic review",
    "scoping review",
    "survey",
    "sok",
    "prisma",
    "method",
    "methodology",
    "search",
    "database",
    "inclusion",
    "exclusion",
    "screening",
    "eligibility",
    "selection",
    "snowball",
    "coding",
    "codebook",
    "data extraction",
    "extracted",
    "taxonomy",
    "thematic",
    "inter-rater",
    "interrater",
    "irr",
    "kappa",
    "agreement",
    "disagreement",
    "resolved",
    "conflict",
    "independent",
    "reviewer",
    "annotator",
]


def clean_filename(value):
    return re.sub(r"[^A-Za-z0-9_.-]+", "_", value).strip("_")[:120]


def normalize_text(text):
    text = text.replace("\r", "\n")
    text = re.sub(r"-\n(?=[a-z])", "", text)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text


def windows_for_keywords(text, window=1200):
    lower = text.lower()
    spans = []
    for keyword in KEYWORDS:
        start = 0
        while True:
            index = lower.find(keyword, start)
            if index == -1:
                break
            spans.append((max(0, index - window), min(len(text), index + len(keyword) + window), keyword))
            start = index + len(keyword)
    if not spans:
        return []
    spans.sort()
    merged = []
    for start, end, keyword in spans:
        if not merged or start > merged[-1][1] + 300:
            merged.append([start, end, {keyword}])
        else:
            merged[-1][1] = max(merged[-1][1], end)
            merged[-1][2].add(keyword)
    snippets = []
    for index, (start, end, keywords) in enumerate(merged[:24], 1):
        snippet = text[start:end].strip()
        snippets.append({
            "index": index,
            "keywords": sorted(keywords),
            "start": start,
            "end": end,
            "text": snippet,
        })
    return snippets


def first_fulltext(record):
    candidates = []
    for attachment in record.get("attachments", []):
        content = (attachment.get("fulltext") or {}).get("content") or ""
        if content.strip():
            candidates.append((len(content), attachment, content))
    if not candidates:
        return None, ""
    candidates.sort(reverse=True, key=lambda item: item[0])
    return candidates[0][1], normalize_text(candidates[0][2])


def main():
    if len(sys.argv) != 3:
        raise SystemExit("usage: zotero_review_extract_snippets.py INVENTORY_JSON OUT_DIR")
    inventory_path = Path(sys.argv[1])
    out_dir = Path(sys.argv[2])
    text_dir = out_dir / "texts"
    snippet_dir = out_dir / "snippets"
    text_dir.mkdir(parents=True, exist_ok=True)
    snippet_dir.mkdir(parents=True, exist_ok=True)

    inventory = json.loads(inventory_path.read_text(encoding="utf-8"))
    rows = []
    for record in inventory["records"]:
        attachment, text = first_fulltext(record)
        base = f"{record['key']}_{clean_filename(record['title'])}"
        text_path = text_dir / f"{base}.txt"
        snippet_path = snippet_dir / f"{base}.json"
        snippets = windows_for_keywords(text) if text else []
        if text:
            text_path.write_text(text, encoding="utf-8")
        snippet_payload = {
            "key": record["key"],
            "author_year": record["author_year"],
            "venue": record["venue"],
            "title": record["title"],
            "doi": record.get("doi", ""),
            "url": record.get("url", ""),
            "abstract": record.get("abstract", ""),
            "attachment": attachment,
            "text_path": str(text_path) if text else "",
            "snippets": snippets,
        }
        snippet_path.write_text(json.dumps(snippet_payload, ensure_ascii=False, indent=2), encoding="utf-8")
        rows.append({
            "key": record["key"],
            "title": record["title"],
            "author_year": record["author_year"],
            "venue": record["venue"],
            "text_chars": len(text),
            "snippet_count": len(snippets),
            "snippet_path": str(snippet_path),
            "text_path": str(text_path) if text else "",
        })

    index_path = out_dir / "snippet_index.json"
    index_path.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({
        "items": len(rows),
        "with_text": sum(1 for row in rows if row["text_chars"]),
        "without_text": [row["key"] for row in rows if not row["text_chars"]],
        "index": str(index_path),
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
