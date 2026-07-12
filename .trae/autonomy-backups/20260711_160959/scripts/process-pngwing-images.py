"""Process PNGWing images: copy, convert to WebP, optimize."""
from PIL import Image
import os

base_public = "public/images"
logo_dir = "logo"

mappings = [
    ("home page team image.png", "work/img-work-with-us.png", "Team/Work"),
    ("home page image 2.png", "timeline/img-timeline.png", "Timeline/Process"),
    ("home page portfolio.png", "portfolio/img-portfolio.png", "Portfolio"),
    ("hero section image.png", "upgrade/img-upgrade.png", "Let's Talk"),
]

for src_file, dest_rel, label in mappings:
    src = os.path.join(logo_dir, src_file)
    dest = os.path.join(base_public, dest_rel)

    img = Image.open(src)
    orig_w, orig_h = img.size

    # Convert to RGB (handles RGBA and paletted modes)
    if img.mode == "RGBA":
        bg = Image.new("RGB", img.size, "#0a0a0a")
        bg.paste(img, mask=img.split()[3])
        img = bg
    elif img.mode != "RGB":
        img = img.convert("RGB")

    # Save PNG
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    img.save(dest, "PNG", optimize=True)
    png_kb = os.path.getsize(dest) / 1024

    # Save WebP
    webp_dest = dest.replace(".png", ".webp")
    img.save(webp_dest, "WEBP", quality=85, method=6)
    webp_kb = os.path.getsize(webp_dest) / 1024

    print("{}: {}x{} | PNG: {:.0f}KB | WebP: {:.0f}KB ({:.0f}% smaller)".format(
        label, orig_w, orig_h, png_kb, webp_kb, (1 - webp_kb / png_kb) * 100
    ))

print()
print("All 4 images processed and saved.")
