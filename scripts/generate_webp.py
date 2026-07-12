from PIL import Image
import os

# Non-destructive: generate .webp copies for PNGs listed below
targets = [
    'public/images/portfolio/img-portfolio.png',
    'public/images/portfolio/portfolio-showcase.png',
    'public/images/timeline/process-flow.png',
    'public/images/timeline/img-timeline.png',
    'public/images/upgrade/img-upgrade.png',
    'public/images/upgrade/lets-talk.png',
    'public/images/work/bg-start.png',
    'public/images/work/img-work-with-us.png',
    'public/images/work/team-collaboration.png'
]

os.makedirs('public/images', exist_ok=True)
report = []
for p in targets:
    if not os.path.exists(p):
        report.append((p, 'MISSING'))
        continue
    try:
        img = Image.open(p).convert('RGB')
        webp_path = os.path.splitext(p)[0] + '.webp'
        # quality 80, method 6
        img.save(webp_path, 'WEBP', quality=80, method=6)
        size = os.path.getsize(webp_path)
        report.append((p, 'OK', webp_path, size))
    except Exception as e:
        report.append((p, 'ERROR', str(e)))

for r in report:
    print(r)
