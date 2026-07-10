"""Download professional stock images from Unsplash for CWorks digital agency website.
All images under Unsplash License: free for commercial and non-commercial use.
Replaces crypto-themed placeholders with service-aligned professional visuals.
"""
import urllib.request
import os
import sys
from PIL import Image
from io import BytesIO

PUBLIC_DIR = "d:/Projects/Personal projects/website/public/images"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
}

# Each entry: output path, Unsplash photo URL, section description
IMAGES = [
    {
        "path": "hero/banner-image.png",
        "url": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=85&fit=crop",
        "section": "Hero Banner",
        "desc": "Modern tech workspace with code on screens",
    },
    {
        "path": "work/img-work-with-us.png",
        "url": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85&fit=crop",
        "section": "Team / Work With Us",
        "desc": "Diverse team collaborating in modern office",
    },
    {
        "path": "portfolio/img-portfolio.png",
        "url": "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&q=85&fit=crop",
        "section": "Portfolio",
        "desc": "UI/UX design workspace with sketches and screens",
    },
    {
        "path": "upgrade/img-upgrade.png",
        "url": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=85&fit=crop",
        "section": "Contact / CTA",
        "desc": "Professional business handshake and consultation",
    },
]


def download_image(url):
    """Download image from URL and return bytes."""
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=60) as resp:
        if resp.status != 200:
            raise Exception(f"HTTP {resp.status}")
        return resp.read()


def save_as_png(image_bytes, output_path):
    """Convert to PNG and save."""
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img = Image.open(BytesIO(image_bytes))
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGBA")
    else:
        img = img.convert("RGB")
    img.save(output_path, "PNG", optimize=True)
    size_kb = os.path.getsize(output_path) / 1024
    print(f"  Saved PNG: {img.size[0]}x{img.size[1]}, {size_kb:.0f}KB")
    return img.size


def main():
    print("=" * 60)
    print("CWorks Image Downloader (Unsplash)")
    print("=" * 60)

    for i, img_config in enumerate(IMAGES, 1):
        output_path = os.path.join(PUBLIC_DIR, img_config["path"])

        print(f"\n[{i}/4] {img_config['section']} — {img_config['desc']}")
        print(f"  Source: {img_config['url'][:80]}...")
        print(f"  Target: public/images/{img_config['path']}")

        try:
            image_bytes = download_image(img_config["url"])
            print(f"  Downloaded: {len(image_bytes)/1024:.0f}KB")

            save_as_png(image_bytes, output_path)
            print(f"  OK")

        except Exception as e:
            print(f"  FAILED: {e}", file=sys.stderr)
            sys.exit(1)

    print(f"\n{'=' * 60}")
    print("All 4 images downloaded and saved!")
    print(f"{'=' * 60}")
    print("\nFiles replaced:")
    for img_config in IMAGES:
        print(f"  public/images/{img_config['path']}")


if __name__ == "__main__":
    main()
