#!/usr/bin/env python3
"""福彩3D 数据更新脚本（云端 GitHub Actions 用，仅依赖标准库）。

数据源：https://data.17500.cn/3d_asc.txt （纯文本全量历史，无需密钥）。
每行格式： 期号 日期 百 十 个 试机号x3 ... 其余字段忽略
例： 2026155 2026-06-14 4 0 9 9 0 3 1 1 106919648 ...

策略：抓全量 -> 取最近 KEEP 期 -> 与本地合并去重 -> 有变化才写回。
容错：抓取失败/数据异常时安静退出(返回0)，绝不破坏已有 data/draws.json。
"""
import json
import sys
import urllib.request
from pathlib import Path

DATA = Path(__file__).resolve().parent.parent / "data" / "draws.json"
KEEP = 300  # 保留最近多少期，控制文件大小
SOURCES = [
    "https://data.17500.cn/3d_asc.txt",
    "http://data.17500.cn/3d_asc.txt",  # 备用：万一 https 抽风
]
UA = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")


def fetch_text():
    for url in SOURCES:
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=30) as resp:
                text = resp.read().decode("utf-8", "replace")
            if text and text.count("\n") > 10:
                print(f"[ok] 抓取成功：{url}（{text.count(chr(10))} 行）")
                return text
            print(f"[warn] 内容异常：{url}")
        except Exception as e:  # noqa: BLE001
            print(f"[warn] 抓取失败 {url}: {e}")
    return None


def parse(text):
    rows = []
    for line in text.splitlines():
        p = line.split()
        if len(p) < 5 or not p[0].isdigit():
            continue
        try:
            n = [int(p[2]), int(p[3]), int(p[4])]
        except ValueError:
            continue
        if not all(0 <= x <= 9 for x in n):
            continue
        rows.append({"issue": p[0], "date": p[1], "n": n})
    return rows


def main():
    if not DATA.exists():
        print("找不到 data/draws.json，跳过")
        return 0
    text = fetch_text()
    if not text:
        print("所有源都没抓到，保留原数据，安静退出。")
        return 0
    fetched = parse(text)
    if not fetched:
        print("解析后没有有效数据，保留原数据，安静退出。")
        return 0

    doc = json.loads(DATA.read_text("utf-8"))
    draws = {d["issue"]: d for d in doc.get("draws", [])}
    before = len(draws)
    for r in fetched:
        draws[r["issue"]] = r

    merged = sorted(draws.values(), key=lambda d: int(d["issue"]))[-KEEP:]
    latest = merged[-1]
    doc["draws"] = merged
    doc["source"] = "data.17500.cn"
    doc["updated"] = latest.get("date", doc.get("updated", ""))

    DATA.write_text(json.dumps(doc, ensure_ascii=False, indent=0), "utf-8")
    print(f"更新完成：新增/更新后共 {len(merged)} 期（原 {before}），"
          f"最新 {latest['issue']} -> {''.join(map(str, latest['n']))}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
