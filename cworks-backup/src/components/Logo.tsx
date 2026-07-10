import Image from "next/image";

type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "auto" | "low";
};

/**
 * Responsive CWorks logo using <picture> with WebP primary + PNG fallback.
 * Aspect ratio: 259:143, from original source.
 * Only rendered on solid white backgrounds (header island).
 */
export function Logo({
  width = 259,
  height = 143,
  className = "",
  loading = "lazy",
  fetchPriority,
}: LogoProps) {
  return (
    <picture>
      <source
        srcSet="/logo/cworks-logo-desktop.webp"
        type="image/webp"
        media="(min-width: 768px)"
      />
      <source
        srcSet="/logo/cworks-logo-tablet.webp"
        type="image/webp"
        media="(min-width: 480px)"
      />
      <source srcSet="/logo/cworks-logo-mobile.webp" type="image/webp" />
      <source
        srcSet="/logo/cworks-logo-desktop.png"
        type="image/png"
        media="(min-width: 768px)"
      />
      <source
        srcSet="/logo/cworks-logo-tablet.png"
        type="image/png"
        media="(min-width: 480px)"
      />
      <Image
        src="/logo/cworks-logo-mobile.png"
        alt="CWorks digital agency Kampala Uganda - We build digital. We ship results."
        width={width}
        height={height}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        style={{ aspectRatio: width + " / " + height }}
      />
    </picture>
  );
}
