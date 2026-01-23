import { useEffect, useState } from 'react';

interface TimelineItem {
  period: string;
  title: string;
  company?: string;
  description: string;
  tags: string[];
}

const timelineData: TimelineItem[] = [
  {
    period: "2013 - 2018",
    title: "Ph.D. in Operations Research",
    description: "Focused on theoretical optimization problem",
    tags: ["Optimization", "Mathematical Modeling", "Research"]
  },
  {
    period: "2018 - 2020",
    title: "Software Engineer, Infrastructure",
    company: "Snap Inc.",
    description: "Built service mesh infrastructure powering real-time communication for hundreds of millions of users.",
    tags: ["Distributed Systems", "Infrastructure"]
  },
  {
    period: "2020 - 2022",
    title: "Machine Learning Engineer",
    company: "Snap Inc.",
    description: "Developed machine learning models for friending suggestions and notification optimization, directly impacting user engagement and retention.",
    tags: ["ML Systems", "Recommendation Systems"]
  },
  {
    period: "2022 - 2025",
    title: "Software Engineer, Machine Learning",
    company: "Meta Inc.",
    description: "Trained and deployed machine learning models for users' languages, advertiser's subsidy and ads notifications that are running in Meta's ads systems",
    tags: ["ML Systems", "Ads"]
  },
  {
    period: "2025 - Present",
    title: "Software Engineer, Machine Learning",
    company: "Meta Inc.",
    description: "Working on classifiers (fine tuned LLMs) and safety eval to block unsafe contents generated from AI",
    tags: ["Post Training", "AI Safety", "LLMs"]
  }
];

function TimelineCard({ item, index, isVisible }: { item: TimelineItem; index: number; isVisible: boolean }) {
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'} mb-3`}>
      {/* Connector to center line */}
      <div
        className={`absolute top-1/2 w-6 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400
          ${isLeft ? 'right-1/2 mr-3' : 'left-1/2 ml-3'}`}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
          transitionDelay: `${index * 0.1}s`
        }}
      />

      {/* Card */}
      <div
        className={`w-5/12 ${isLeft ? 'pr-8' : 'pl-8'}`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease-out',
          transitionDelay: `${index * 0.15}s`
        }}
      >
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />

          <div className="relative bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
            {/* Period badge */}
            <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-1.5 animate-pulse" />
              {item.period}
            </div>

            {/* Title & Company */}
            <h3 className="text-base font-semibold text-gray-900 mb-0.5">{item.title}</h3>
            {item.company && (
              <p className="text-sm font-medium text-indigo-600 mb-1">{item.company}</p>
            )}

            {/* Description */}
            <p className="text-gray-600 text-xs leading-relaxed mb-2">{item.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 text-xs rounded bg-gray-50 text-gray-500 border border-gray-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Background() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="relative space-y-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-light text-gray-900 mb-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'all 0.6s ease-out'
            }}
          >
            Background
          </h1>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 via-purple-300 to-indigo-200"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
              transformOrigin: 'top',
              transition: 'all 0.8s ease-out'
            }}
          />

          {/* Timeline nodes on center line */}
          {timelineData.map((_, index) => (
            <div
              key={index}
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-indigo-400 shadow-sm z-10"
              style={{
                top: `${index * 100 + 36}px`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0)',
                transition: 'all 0.4s ease-out',
                transitionDelay: `${index * 0.15 + 0.3}s`
              }}
            >
              <div className="absolute inset-0.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
            </div>
          ))}

          {/* Cards */}
          {timelineData.map((item, index) => (
            <TimelineCard key={index} item={item} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </div>
  );
}
