"""Generate branded CWorks imagery: hero visual, portfolio showcase, team image.
Palette: CWorks blue #0815A6 / #050F67, dark navy backgrounds, white text.
"""
from PIL import Image, ImageDraw, ImageFilter
import math, os

BASE = r"C:/Users/Momolili/Documents/ChatGPT/Cworks/cworks-website/public/images"
BLUE = (8, 21, 166)
DEEP = (5, 15, 103)
NAVY = (7, 8, 26)
GOLD = (255, 191, 64)
WHITE = (240, 244, 255)

def glow_bg(w, h):
    """Dark navy gradient with blue radial glows."""
    img = Image.new("RGB", (w, h), NAVY)
    px = img.load()
    # two radial glows
    glows = [(int(w*0.25), int(h*0.3), w//2, BLUE, 60), (int(w*0.8), int(h*0.75), w//2, DEEP, 80)]
    for gx, gy, r, col, strength in glows:
        pass
    # draw glows on overlay then blur
    ov = Image.new("RGB", (w, h), (0,0,0))
    d = ImageDraw.Draw(ov)
    for gx, gy, r, col, strength in glows:
        for i in range(6):
            rr = r * (1 - i*0.13)
            c = tuple(int(v * (0.25 + 0.13*i)) for v in col)
            d.ellipse([gx-rr, gy-rr, gx+rr, gy+rr], fill=c)
    ov = ov.filter(ImageFilter.GaussianBlur(60))
    img = Image.blend(img, Image.composite(ov, img, Image.new("L", (w,h), 110)), 0.9)
    # subtle grid
    d = ImageDraw.Draw(img, "RGBA")
    step = 56
    for x in range(0, w, step):
        d.line([(x,0),(x,h)], fill=(255,255,255,7))
    for y in range(0, h, step):
        d.line([(0,y),(w,y)], fill=(255,255,255,7))
    return img

def browser_mock(w, h, title, rows):
    """A stylised browser window mock (dashboard/site)."""
    img = glow_bg(w, h)
    d = ImageDraw.Draw(img, "RGBA")
    # window
    wx, wy = int(w*0.08), int(h*0.12)
    ww, wh = int(w*0.84), int(h*0.76)
    d.rounded_rectangle([wx, wy, wx+ww, wy+wh], radius=24, fill=(14, 16, 44, 255), outline=(80, 96, 220, 160), width=2)
    # title bar
    d.rounded_rectangle([wx, wy, wx+ww, wy+56], radius=24, fill=(10, 12, 34, 255))
    d.rectangle([wx, wy+30, wx+ww, wy+56], fill=(10, 12, 34, 255))
    for i, c in enumerate([(255,95,86),(255,189,46),(39,201,63)]):
        d.ellipse([wx+22+i*30, wy+20, wx+40+i*30, wy+38], fill=c)
    # url pill
    d.rounded_rectangle([wx+120, wy+12, wx+ww-24, wy+44], radius=16, fill=(22, 25, 58, 255))
    d.text((wx+140, wy+18), f"cworks.ug / {title}", fill=(150, 160, 210, 255))
    # content blocks
    y = wy + 84
    for i in range(rows):
        bw = ww - 48
        d.rounded_rectangle([wx+24, y, wx+24+bw, y+34], radius=10, fill=(24, 28, 66, 255))
        accent = BLUE if i % 2 == 0 else DEEP
        d.rounded_rectangle([wx+24, y, wx+24+int(bw*(0.35+0.15*((i*7)%4))), y+34], radius=10, fill=accent + (230,))
        y += 52
    # floating badge
    bx, by = wx+ww-140, wy-26
    d.rounded_rectangle([bx, by, bx+130, by+52], radius=14, fill=BLUE + (255,))
    d.text((bx+22, by+16), "CWorks", fill=WHITE + (255,))
    return img

# ---- HERO: dashboard trio ----
os.makedirs(f"{BASE}/hero", exist_ok=True)
hero = Image.new("RGBA", (1150, 1150), (0,0,0,0))
a = browser_mock(760, 620, "dashboard", 5).convert("RGBA")
b = browser_mock(560, 430, "storefront", 4).convert("RGBA")
c = browser_mock(520, 400, "booking", 4).convert("RGBA")
hero.alpha_composite(a, (60, 130))
hero.alpha_composite(b.rotate(-4, expand=True, resample=Image.BICUBIC), (470, 420))
hero.alpha_composite(c.rotate(3, expand=True, resample=Image.BICUBIC), (30, 660))
hero.convert("RGB").save(f"{BASE}/hero/hero-section-image-3.png")
print("hero done")

# ---- PORTFOLIO SHOWCASE: hex-ish project cards ----
pf = Image.new("RGBA", (780, 700), (0,0,0,0))
card_src = browser_mock(600, 460, "projects", 4).convert("RGBA")
pf.alpha_composite(card_src.rotate(-3, expand=True, resample=Image.BICUBIC), (30, 60))
d = ImageDraw.Draw(pf, "RGBA")
# stat chips
chips = [("12+ Projects", BLUE), ("6 Industries", DEEP), ("100% Uganda-built", (30, 34, 80))]
cx, cy = 90, 560
for label, col in chips:
    wch = 40 + 11*len(label)
    d.rounded_rectangle([cx, cy, cx+wch, cy+64], radius=18, fill=col + (255,), outline=(255,255,255,40), width=1)
    d.text((cx+20, cy+22), label, fill=WHITE + (255,))
    cx += wch + 24
pf.convert("RGB").save(f"{BASE}/portfolio/portfolio-showcase.png")
print("portfolio done")

# ---- TEAM COLLABORATION: abstract team network ----
TC_W, TC_H = 1186, 840  # matches 600x425 render aspect
tc = glow_bg(TC_W, TC_H)
d = ImageDraw.Draw(tc, "RGBA")
# nodes = team roles
nodes = [
    (0.50, 0.18, "Lead Dev"), (0.22, 0.38, "Designer"), (0.78, 0.38, "Backend"),
    (0.16, 0.68, "Frontend"), (0.84, 0.68, "DevOps"), (0.50, 0.86, "PM"),
]
pts = [(int(x*TC_W), int(y*TC_H)) for x, y, _ in nodes]
for i in range(len(pts)):
    for j in range(i+1, len(pts)):
        d.line([pts[i], pts[j]], fill=(60, 80, 220, 60), width=2)
for (px, py), (_, _, label) in zip(pts, nodes):
    r = 54
    d.ellipse([px-r, py-r, px+r, py+r], fill=DEEP + (255,), outline=BLUE + (255,), width=4)
    d.text((px-38, py-8), label, fill=WHITE + (255,))
# center CWorks node
px, py = int(0.5*TC_W), int(0.5*TC_H)
d.ellipse([px-90, py-90, px+90, py+90], fill=BLUE + (255,), outline=(255,255,255,90), width=3)
d.text((px-58, py-14), "CWorks", fill=WHITE + (255,))
tc.convert("RGB").save(f"{BASE}/work/team-collaboration.png")
print("team done")
