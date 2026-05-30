import pathlib
import re

root = pathlib.Path('d:/shraddha_didi/dev/clone/cloneforspotify/spotify-clone')
css_path = root / 'src' / 'styles' / 'global.css'
css = css_path.read_text(encoding='utf-8')
used_classes = set()

for block in css.split('{')[:-1]:
    selector_part = block.strip().split('\n')[-1]
    for m in re.finditer(r'\.([a-zA-Z0-9_-]+)\b', selector_part):
        used_classes.add(m.group(1))

used = set()
for f in sorted(root.rglob('src/**/*')):
    if f.suffix in {'.js', '.jsx'}:
        txt = f.read_text(encoding='utf-8')
        used.update(re.findall(r'className\s*=\s*"([^"]+)"', txt))
        used.update(re.findall(r'className\s*=\s*`([^`]+)`', txt))
        used.update(re.findall(r'className\s*=\s*\{\s*"([^"]+)"\s*\}', txt))
        used.update(re.findall(r'className\s*=\s*\{\s*`([^`]+)`\s*\}', txt))
        used.update(re.findall(r'\bclassName\s*=\s*\{[^}]*\}', txt))

used_names = set()
for v in used:
    if isinstance(v, str):
        for part in re.split(r'\s+', v.strip()):
            if part:
                used_names.add(part)

print('css selectors count', len(used_classes))
print('used classnames count', len(used_names))
unused = sorted([c for c in used_classes if c not in used_names])
print('unused count', len(unused))
print('\n'.join(unused))
maybe_missing = sorted([c for c in used_names if c not in used_classes])
print('possibly missing count', len(maybe_missing))
print('\n'.join(maybe_missing[:100]))
