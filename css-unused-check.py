import pathlib
import re

root = pathlib.Path("d:/shraddha_didi/dev/clone/cloneforspotify/spotify-clone")
css_path = root / "src" / "styles" / "global.css"
css = css_path.read_text(encoding="utf-8")
selectors = set(re.findall(r"\.([a-zA-Z0-9_-]+)\b", css))
used = set()
for f in root.rglob("src/**/*"):
    if f.suffix in {".js", ".jsx"}:
        txt = f.read_text(encoding="utf-8")
        used.update(re.findall(r'className\s*=\s*"([^"]+)"', txt))
        used.update(re.findall(r'className\s*=\s*`([^`]+)`', txt))
        used.update(re.findall(r'className\s*=\s*\{\s*"([^"]+)"\s*\}', txt))
        used.update(re.findall(r'className\s*=\s*\{\s*`([^`]+)`\s*\}', txt))
        used.update(re.findall(r'"([a-zA-Z0-9_-]+)"', txt))
used_names = set()
for v in used:
    for part in re.split(r"\s+", v.strip()):
        if part:
            used_names.add(part)
unused = sorted([s for s in selectors if s not in used_names])
print("used_count", len(selectors)-len(unused), "unused_count", len(unused))
print("\n".join(unused[:200]))
