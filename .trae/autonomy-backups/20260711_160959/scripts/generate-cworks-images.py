"""Generate professional AI images for CWorks digital agency website.
Replaces crypto-themed placeholder images with service-aligned visuals.
"""
import urllib.request
import urllib.parse
import os
import sys
from PIL import Image
from io import BytesIO

BASE_API = "https://coresg-normal.trae.ai/api/ide/v1/text_to_image"
PUBLIC_DIR = "d:/Projects/Personal projects/website/public/images"

# Each image maps a target path to its context and generation prompt
IMAGES = [
    {
        "path": "hero/banner-image.png",
        "prompt": "Professional digital agency hero illustration, modern workspace with web development screens showing code and UI designs, clean minimalist tech office, deep blue and dark color palette, abstract digital network elements, high quality corporate aesthetic, no text",
        "size": "square_hd",
        "section": "Hero Banner",
    },
    {
        "path": "work/img-work-with-us.png",
        "prompt": "Diverse creative tech team collaborating in modern office, web developers and UI designers working together around monitors, warm professional atmosphere, natural lighting, teamwork and innovation, modern startup office, no text",
        "size": "landscape_4_3",
        "section": "Team / Work With Us",
    },
    {
        "path": "portfolio/img-portfolio.png",
        "prompt": "Digital portfolio showcase, multiple screens displaying website designs UI mockups and brand identity projects, creative studio desk with color swatches and design tools, modern digital agency aesthetic, dark theme with blue accents, professional creative workspace, no text",
        "size": "square_hd",
        "section": "Portfolio",
    },
    {
        "path": "upgrade/img-upgrade.png",
        "prompt": "Professional business consultation scene, client and digital agency team engaged in productive discussion, modern conference room setting, handshake and collaboration, trust and partnership atmosphere, corporate blue color scheme, warm professional lighting, no text",
        "size": "square_hd",
        "section": "Contact / CTA",
    },
]


def generate_image(prompt, size):
    """Call the text-to-image API and return raw image bytes."""
    encoded_prompt = urllib.parse.quote(prompt)
    url = f"{BASE_API}?prompt={encoded_prompt}&image_size={size}"
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=120) as resp:
        if resp.status != 200:
            raise Exception(f"API returned status {resp.status}")
        return resp.read()


def save_as_png(image_bytes, output_path):
    """Convert JPEG bytes to PNG and save."""
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img = Image.open(BytesIO(image_bytes))
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGBA")
    else:
        img = img.convert("RGB")
    img.save(output_path, "PNG", optimize=True)
    size_kb = os.path.getsize(output_path) / 1024
    print(f"  Saved: {os.path.basename(output_path)} ({img.size[0]}x{img.size[1]}, {size_kb:.0f}KB)")
    return img.size


def main():
    print("=" * 60)
    print("CWorks Image Generator")
    print("=" * 60)

    for i, img_config in enumerate(IMAGES, 1):
        section = img_config["section"]
        output_path = os.path.join(PUBLIC_DIR, img_config["path"])

        print(f"\n[{i}/4] {section}")
        print(f"  Prompt: {img_config['prompt'][:80]}...")
        print(f"  Size: {img_config['size']}")
        print(f"  Generating...")

        try:
            image_bytes = generate_image(img_config["prompt"], img_config["size"])
            print(f"  Downloaded: {len(image_bytes)/1024:.0f}KB JPEG")

            dimensions = save_as_png(image_bytes, output_path)
            print(f"  OK - {section} image replaced successfully")

        except Exception as e:
            print(f"  FAILED: {e}", file=sys.stderr)
            sys.exit(1)

    print(f"\n{'=' * 60}")
    print("All 4 images generated and saved successfully!")
    print(f"{'=' * 60}")
    print("\nFiles replaced:")
    for img_config in IMAGES:
        print(f"  public/images/{img_config['path']}")


if __name__ == "__main__":
    main()
