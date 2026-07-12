import React from 'react';

type Props = {
  src: string; // path to png
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
};

const Picture: React.FC<Props> = ({ src, alt = '', className, width, height, sizes, loading = 'lazy' }) => {
  const webp = src.replace(/\.png$/i, '.webp');
  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img src={src} alt={alt} className={className} width={width} height={height} loading={loading} sizes={sizes} />
    </picture>
  );
};

export default Picture;
