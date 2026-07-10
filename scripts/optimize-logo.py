"""Optimize CWorks logo for web delivery using the provided JPEG source."""
from PIL import Image
import os

SRC = "d:/Projects/Personal projects/website/logo/Cworks logo.jpeg"
OUT_DIR = "d:/Projects/Personal projects/website/public/logo"

# Responsive variants: (name, max_width) — preserving aspect ratio
VARIANTS = [
    ("mobile", 240),
    ("tablet", 320),
    ("desktop", 400),
]

QUALITY_WEBP = 85
QUALITY_PNG_OPT = 7

def optimize():
    os.makedirs(OUT_DIR, exist_ok=True)
    img = Image.open(SRC).convert("RGB")
    orig_w, orig_h = img.size
    print(f"Source: {SRC}")
    print(f"  Size: {orig_w}x{orig_h}, {os.path.getsize(SRC)} bytes")

    total_size = 0

    for name, max_w in VARIANTS:
        # Scale preserving aspect ratio
        ratio = max_w / orig_w
        new_h = round(orig_h * ratio)
        resized = img.resize((max_w, new_h), Image.LANCZOS)

        # --- WebP ---
        webp_path = os.path.join(OUT_DIR, f"cworks-logo-{name}.webp")
        resized.save(webp_path, "WEBP", quality=QUALITY_WEBP, method=6)
        webp_size = os.path.getsize(webp_path)
        total_size += webp_size

        # --- PNG fallback ---
        png_path = os.path.join(OUT_DIR, f"cworks-logo-{name}.png")
        resized.save(png_path, "PNG", optimize=True, compress_level=QUALITY_PNG_OPT)
        png_size = os.path.getsize(png_path)
        total_size += png_size

        print(f"  {name}: {max_w}x{new_h}  WebP={webp_size}B  PNG={png_size}B")

    total_webp = sum(
        os.path.getsize(os.path.join(OUT_DIR, f"cworks-logo-{v[0]}.webp"))
        for v in VARIANTS
    )
    print(f"\nTotal (WebP+PNG): {total_size} bytes ({total_size/1024:.1f} KB)")
    print(f"Total WebP only: {total_webp} bytes ({total_webp/1024:.1f} KB)")

if __name__ == "__main__":
    optimize()
