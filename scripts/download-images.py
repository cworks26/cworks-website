"""Download high-quality stock images from Unsplash for CWorks website.
All images under Unsplash License: free for commercial and non-commercial use, no permission needed.
"""
import urllib.request
import os
from PIL import Image

IMAGES = {
    # Hero background - modern tech workspace with natural lighting
    "hero/hero-workspace-tech-agency": {
        "url": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85",
        "credit": "Ilya Pavlov / Unsplash",
        "license": "Unsplash License (free for commercial use)",
    },
    # Portfolio: e-commerce
    "sections/ecommerce-online-store-platform": {
        "url": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=85",
        "credit": "Marvin Meyer / Unsplash",
        "license": "Unsplash License",
    },
    # Portfolio: brand identity / graphic design workspace
    "sections/brand-identity-creative-design": {
        "url": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=85",
        "credit": "Kelly Sikkema / Unsplash",
        "license": "Unsplash License",
    },
    # Portfolio: mobile app / UI design workspace
    "sections/app-interface-ui-ux-prototype": {
        "url": "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=85",
        "credit": "UX Indonesia / Unsplash",
        "license": "Unsplash License",
    },
    # Portfolio: data center / systems
    "sections/inventory-data-server-system": {
        "url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=85",
        "credit": "Lukas Blazek / Unsplash",
        "license": "Unsplash License",
    },
    # About section - team workspace
    "sections/team-collaboration-workspace": {
        "url": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85",
        "credit": "Annie Spratt / Unsplash",
        "license": "Unsplash License",
    },
    # Contact section background - modern office building
    "sections/contact-modern-office-building": {
        "url": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85",
        "credit": "Scott Blake / Unsplash",
        "license": "Unsplash License",
    },
    # Hero secondary - developer coding
    "hero/developer-coding-laptop-dark": {
        "url": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&q=85",
        "credit": "ThisisEngineering RAEng / Unsplash",
        "license": "Unsplash License",
    },
}

OUT_DIR = "d:/Projects/Personal projects/website/public/assets/images"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
}


def download_image(name, url):
    path = os.path.join(OUT_DIR, f"{name}.jpg")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req) as response:
        data = response.read()
        with open(path, "wb") as f:
            f.write(data)
    size_kb = len(data) / 1024
    img = Image.open(path)
    print(f"  {name}.jpg: {img.size[0]}x{img.size[1]}, {size_kb:.0f}KB")
    return path


def optimize_image(src_path):
    """Create WebP versions at quality 80."""
    img = Image.open(src_path).convert("RGB")
    webp_path = src_path.replace(".jpg", ".webp")
    img.save(webp_path, "WEBP", quality=82, method=6)
    webp_kb = os.path.getsize(webp_path) / 1024
    print(f"  -> {os.path.basename(webp_path)}: {webp_kb:.0f}KB")
    return webp_path


if __name__ == "__main__":
    total_before = 0
    total_after = 0

    for name, info in IMAGES.items():
        print(f"\nDownloading: {name}")
        try:
            jpg_path = download_image(name, info["url"])
            jpg_size = os.path.getsize(jpg_path)
            total_before += jpg_size

            webp_path = optimize_image(jpg_path)
            webp_size = os.path.getsize(webp_path)
            total_after += webp_size

            print(f"  Source: {info['credit']} | License: {info['license']}")
        except Exception as e:
            print(f"  FAILED: {e}")

    print(f"\n--- Summary ---")
    print(f"Total JPEG: {total_before/1024:.0f}KB")
    print(f"Total WebP: {total_after/1024:.0f}KB")
    print(f"Savings: {(1 - total_after/total_before)*100:.0f}%")
