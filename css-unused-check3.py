import pathlib
import re

root = pathlib.Path('d:/shraddha_didi/dev/clone/cloneforspotify/spotify-clone')
css_path = root / 'src' / 'styles' / 'global.css'
css = css_path.read_text(encoding='utf-8')
selectors = set()
for block in css.split('{')[:-1]:
    selector_part = block.strip().split('\n')[-1]
    for m in re.finditer(r'\.([a-zA-Z0-9_-]+)\b', selector_part):
        selectors.add(m.group(1))

text = ''
for f in sorted(root.rglob('src/**/*')):
    if f.suffix in {'.js', '.jsx'}:
        text += '\n' + f.read_text(encoding='utf-8')

unused = sorted([s for s in selectors if not re.search(r'\b' + re.escape(s) + r'\b', text)])
print('selectors count', len(selectors))
print('unused count', len(unused))
print('\n'.join(unused))
