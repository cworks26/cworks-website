import Image from 'next/image';
import React from 'react';

interface PictureProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function Picture({ src, alt, width, height, className }: PictureProps) {
  // Use next/image for default; fall back to simple image if needed
  return (
    <picture className={className}>
      <source srcSet={src.replace(/\.png|\.jpg|\.jpeg$/, '.webp')} type="image/webp" />
      <source srcSet={src.replace(/\.png|\.jpg|\.jpeg$/, '.avif')} type="image/avif" />
      <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 768px) 100vw, 50vw" />
    </picture>
  );
}
