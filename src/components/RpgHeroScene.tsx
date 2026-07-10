import aboutClouds from '../assets/hero/about-clouds-v4.png';
import aboutRestingTraveler from '../assets/hero/about-resting-traveler-v4.png';
import aboutRpgBackground from '../assets/hero/about-rpg-background-v5.webp';
import blogRpgBackground from '../assets/hero/blog-rpg-background-v3.webp';
import blogWritingStrip from '../assets/hero/blog-writing-strip-v3.png';
import readingBookStrip from '../assets/hero/reading-book-strip-v4.png';
import readingRpgBackground from '../assets/hero/reading-rpg-background-v3.webp';

export type RpgHeroSceneVariant = 'about' | 'reading' | 'study';

interface RpgHeroSceneProps {
  variant: RpgHeroSceneVariant;
}

const sceneSources: Record<RpgHeroSceneVariant, string> = {
  about: aboutRpgBackground,
  reading: readingRpgBackground,
  study: blogRpgBackground
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
  return (
    <div className={`rpg-hero rpg-hero--${variant}`} aria-hidden="true">
      <div className="rpg-hero__camera">
        <div className="rpg-hero__stage">
          <img
            src={sceneSources[variant]}
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
