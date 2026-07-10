import aboutClouds from '../assets/hero/about-clouds-v4.webp';
import aboutRestingTraveler from '../assets/hero/about-resting-traveler-v4.webp';
import aboutRpgBackground from '../assets/hero/about-rpg-background-v5.webp';
import aboutRpgBackground960 from '../assets/hero/about-rpg-background-v5-960w.webp';
import aboutRpgBackground1440 from '../assets/hero/about-rpg-background-v5-1440w.webp';
import blogRpgBackground from '../assets/hero/blog-rpg-background-v3.webp';
import blogRpgBackground960 from '../assets/hero/blog-rpg-background-v3-960w.webp';
import blogRpgBackground1440 from '../assets/hero/blog-rpg-background-v3-1440w.webp';
import blogWritingStrip from '../assets/hero/blog-writing-strip-v3.webp';
import readingBookStrip from '../assets/hero/reading-book-strip-v4.webp';
import readingRpgBackground from '../assets/hero/reading-rpg-background-v3.webp';
import readingRpgBackground960 from '../assets/hero/reading-rpg-background-v3-960w.webp';
import readingRpgBackground1440 from '../assets/hero/reading-rpg-background-v3-1440w.webp';

export type RpgHeroSceneVariant = 'about' | 'reading' | 'study';

interface RpgHeroSceneProps {
  variant: RpgHeroSceneVariant;
}

interface SceneSource {
  src: string;
  srcSet: string;
}

const heroImageSizes = '(max-width: 640px) 185vw, (max-width: 960px) 106vw, 950px';

const sceneSources: Record<RpgHeroSceneVariant, SceneSource> = {
  about: {
    src: aboutRpgBackground,
    srcSet: `${aboutRpgBackground960} 960w, ${aboutRpgBackground1440} 1440w, ${aboutRpgBackground} 1935w`,
  },
  reading: {
    src: readingRpgBackground,
    srcSet: `${readingRpgBackground960} 960w, ${readingRpgBackground1440} 1440w, ${readingRpgBackground} 1896w`,
  },
  study: {
    src: blogRpgBackground,
    srcSet: `${blogRpgBackground960} 960w, ${blogRpgBackground1440} 1440w, ${blogRpgBackground} 1896w`,
  },
};

const subjectSources: Record<Exclude<RpgHeroSceneVariant, 'about'>, string> = {
  reading: readingBookStrip,
  study: blogWritingStrip
};

const ambientParticleCount = 8;

function AboutSubject() {
  return (
    <>
      <span className="rpg-hero__cloud-field">
        <img
          src={aboutClouds}
          alt=""
          className="rpg-hero__clouds rpg-hero__clouds--far"
          draggable="false"
        />
        <img
          src={aboutClouds}
          alt=""
          className="rpg-hero__clouds rpg-hero__clouds--near"
          draggable="false"
        />
      </span>
      <img
        src={aboutRestingTraveler}
        alt=""
        className="rpg-hero__resting-traveler"
        decoding="async"
        draggable="false"
      />
    </>
  );
}

function AnimatedSubject({ variant }: { variant: Exclude<RpgHeroSceneVariant, 'about'> }) {
  return (
    <span className="rpg-hero__subject">
      <img
        src={subjectSources[variant]}
        alt=""
        className="rpg-hero__sprite-strip"
        decoding="async"
        draggable="false"
      />
    </span>
  );
}

export default function RpgHeroScene({ variant }: RpgHeroSceneProps) {
  const scene = sceneSources[variant];

  return (
    <div className={`rpg-hero rpg-hero--${variant}`} aria-hidden="true">
      <div className="rpg-hero__camera">
        <div className="rpg-hero__stage">
          <img
            src={scene.src}
            srcSet={scene.srcSet}
            sizes={heroImageSizes}
            alt=""
            className="rpg-hero__image"
            decoding="async"
            draggable="false"
            fetchPriority="high"
          />
          {variant === 'about' ? <AboutSubject /> : <AnimatedSubject variant={variant} />}
          <span className="rpg-hero__particles">
            {Array.from({ length: ambientParticleCount }, (_, index) => (
              <span key={index} />
            ))}
          </span>
        </div>
      </div>
      <span className="rpg-hero__glow" />
      <span className="rpg-hero__vignette" />
    </div>
  );
}
