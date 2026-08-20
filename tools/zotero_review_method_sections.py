#!/usr/bin/env python3
import json
import re
import sys
from pathlib import Path


START_PATTERNS = [
    r"\n\s*(?:\d+\.?\s+)?(?:review )?method(?:s|ology)?\b",
    r"\n\s*(?:\d+\.?\s+)?(?:our )?approach\b",
    r"\n\s*(?:\d+\.?\s+)?review process\b",
    r"\n\s*(?:\d+\.?\s+)?review protocol\b",
    r"\n\s*(?:\d+\.?\s+)?paper collection\b",
    r"\n\s*(?:\d+\.?\s+)?corpus construction\b",
    r"\n\s*(?:\d+\.?\s+)?sampling and analysis\b",
    r"\n\s*(?:\d+\.?\s+)?selection process\b",
    r"\n\s*(?:\d+\.?\s+)?corpus collection\b",
    r"\n\s*(?:\d+\.?\s+)?literature search\b",
    r"\n\s*(?:\d+\.?\s+)?search strategy\b",
    r"\n\s*(?:\d+\.?\s+)?study selection\b",
    r"\n\s*(?:\d+\.?\s+)?data collection\b",
    r"\n\s*(?:\d+\.?\s+)?data extraction\b",
]

NEXT_MAJOR = re.compile(r"\n\s*(?:\d+\.?\s+)?(?:results|findings|analysis|discussion|limitations|conclusion|references)\b", re.I)
SENTENCE_KEYWORDS = re.compile(
    r"prisma|database|acm|scopus|web of science|ieee|pubmed|search|query|keyword|included|excluded|"
    r"inclusion|exclusion|screen|screening|eligible|eligibility|duplicate|snowball|coder|coded|coding|"
    r"codebook|data extraction|extracted|independent|reviewer|author|agreement|inter-rater|interrater|"
    r"kappa|irr|disagreement|resolved|consensus|thematic",
    re.I,
)


def extract_method(text):
    lower = text.lower()
    starts = []
    for pat in START_PATTERNS:
        match = re.search(pat, text, re.I)
        if match:
            starts.append(match.start())
    if not starts:
        return ""
    start = min(starts)
    next_match = NEXT_MAJOR.search(text, start + 500)
    end = next_match.start() if next_match else min(len(text), start + 14000)
    return text[start:end].strip()


def key_sentences(text, limit=28):
    rough = re.split(r"(?<=[.!?])\s+(?=[A-Z0-9\"“])|\n+", text)
    hits = []
    for sent in rough:
        sent = " ".join(sent.split())
        if len(sent) < 35:
            continue
        if SENTENCE_KEYWORDS.search(sent):
            hits.append(sent)
    deduped = []
    seen = set()
    for sent in hits:
        key = sent[:120].lower()
        if key in seen:
            continue
        seen.add(key)
        deduped.append(sent)
        if len(deduped) >= limit:
            break
    return deduped


def main():
    if len(sys.argv) != 3:
        raise SystemExit("usage: zotero_review_method_sections.py SNIPPET_INDEX OUT_JSON")
    rows = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    out = []
    for row in rows:
        text = Path(row["text_path"]).read_text(encoding="utf-8") if row.get("text_path") else ""
        method = extract_method(text) if text else ""
        source = method or text[:12000]
        out.append({
            "key": row["key"],
            "author_year": row["author_year"],
            "venue": row["venue"],
            "title": row["title"],
            "text_chars": row["text_chars"],
            "method_chars": len(method),
            "method_excerpt": method[:6500],
            "key_sentences": key_sentences(source),
        })
    Path(sys.argv[2]).write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({
        "items": len(out),
        "with_method_section": sum(1 for item in out if item["method_chars"]),
        "out": sys.argv[2],
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
