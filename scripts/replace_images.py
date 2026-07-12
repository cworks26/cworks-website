import os
import urllib.request
from PIL import Image

mapping = {
    # hero
    'public/images/hero/banner-image.png': 'https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=2500&q=80',
    'public/images/hero/hero-section-image-3.png': 'https://images.unsplash.com/photo-1523475496153-3d6ccf3c5d03?auto=format&fit=crop&w=2500&q=80',
    'public/images/hero/applestore.png': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    'public/images/hero/playstore.png': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    # portfolio
    'public/images/portfolio/img-portfolio.png': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80',
    'public/images/portfolio/portfolio-showcase.png': 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1920&q=80',
    # timeline
    'public/images/timeline/process-flow.png': 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1920&q=80',
    'public/images/timeline/img-timeline.png': 'https://images.unsplash.com/photo-1503424886309-8c71e26e6f6b?auto=format&fit=crop&w=1200&q=80',
    # upgrade
    'public/images/upgrade/img-upgrade.png': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
    'public/images/upgrade/lets-talk.png': 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80',
    # work
    'public/images/work/bg-start.png': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80',
    'public/images/work/img-work-with-us.png': 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80',
    'public/images/work/team-collaboration.png': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1600&q=80'
}

os.makedirs('public/images', exist_ok=True)
report = []

# create backup
import shutil, datetime
_ts = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
backup_dir = os.path.join('public','images','_backup_replace_'+_ts)
if not os.path.exists(backup_dir):
    os.makedirs(backup_dir)

# copy existing images to backup
for root, dirs, files in os.walk('public/images'):
    for f in files:
        srcp = os.path.join(root,f)
        rel = os.path.relpath(srcp, 'public/images')
        destp = os.path.join(backup_dir, rel)
        os.makedirs(os.path.dirname(destp), exist_ok=True)
        try:
            shutil.copy2(srcp, destp)
        except Exception:
            pass

for target, url in mapping.items():
    os.makedirs(os.path.dirname(target), exist_ok=True)
    tmp = target + '.tmp'
    try:
        urllib.request.urlretrieve(url, tmp)
        img = Image.open(tmp).convert('RGBA')
        # Resize if width > 2500 cap
        w,h = img.size
        if w > 2500:
            nh = int(2500 * h / w)
            img = img.resize((2500, nh), Image.LANCZOS)
        # save optimized PNG
        img.save(target, format='PNG', optimize=True)
        # save webp
        webp_path = os.path.splitext(target)[0] + '.webp'
        img.convert('RGB').save(webp_path, 'WEBP', quality=80, method=6)
        size_png = os.path.getsize(target)
        size_webp = os.path.getsize(webp_path)
        report.append((target, 'OK', size_png, size_webp, url))
        os.remove(tmp)
    except Exception as e:
        report.append((target, 'ERROR', str(e)))

for r in report:
    print(r)
print('backup at', backup_dir)
