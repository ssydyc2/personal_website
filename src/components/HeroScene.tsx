type HeroSceneVariant = 'about' | 'reading' | 'study';

interface HeroSceneProps {
  src: string;
  alt: string;
  variant: HeroSceneVariant;
  className?: string;
}

export default function HeroScene({ src, alt, variant, className = '' }: HeroSceneProps) {
  const classNames = ['hero-scene', `hero-scene--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      <img src={src} alt={alt} className="hero-scene__image" draggable="false" />
      <span className="hero-scene__vignette" aria-hidden="true" />
    </div>
  );
}
