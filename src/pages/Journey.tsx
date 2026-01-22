import { useState } from 'react';
import type { ReactNode } from 'react';

interface Section {
  id: string;
  title: string;
  content: ReactNode;
}

const sections: Section[] = [
  {
    id: 'triton',
    title: 'Triton Kernel',
    content: <p>Content coming soon.</p>,
  },
  {
    id: 'post-training',
    title: 'Post Training',
    content: <p>Content coming soon.</p>,
  },
  {
    id: 'resources',
    title: 'Learning Resources',
    content: <p>Content coming soon.</p>,
  },
];

export default function Journey() {
  const [activeTab, setActiveTab] = useState(sections[0].id);
  const activeSection = sections.find((s) => s.id === activeTab);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-light text-gray-900">
        Journey to Performance Engineer
      </h1>

      <div className="flex gap-12">
        <nav className="flex flex-col gap-2 min-w-[180px] border-r border-gray-100 pr-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`text-left text-sm tracking-wide transition-colors py-2 border-l-2 pl-4 ${
                activeTab === section.id
                  ? 'border-gray-900 text-gray-900 font-medium'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {section.title}
            </button>
          ))}
        </nav>

        <div className="flex-1 text-gray-600 leading-relaxed">
          {activeSection?.content}
        </div>
      </div>
    </div>
  );
}
