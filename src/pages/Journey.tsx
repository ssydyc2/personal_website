import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface Paper {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  topic: string;
  link: string;
  color: string;
  accentColor: string;
}

const papers: Paper[] = [
  {
    id: 'flash-attention-v1',
    title: 'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness',
    authors: 'Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, Christopher Ré',
    venue: 'NeurIPS',
    year: 2022,
    topic: 'FlashAttention v1',
    link: 'https://arxiv.org/abs/2205.14135',
    color: 'from-orange-600 via-red-500 to-rose-600',
    accentColor: 'text-orange-600',
  },
  {
    id: 'flash-attention-v2',
    title: 'FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning',
    authors: 'Tri Dao',
    venue: 'ICLR',
    year: 2024,
    topic: 'FlashAttention v2',
    link: 'https://arxiv.org/abs/2307.08691',
    color: 'from-violet-600 via-purple-600 to-fuchsia-600',
    accentColor: 'text-violet-600',
  },
  {
    id: 'paged-attention',
    title: 'Efficient Memory Management for Large Language Model Serving with PagedAttention',
    authors: 'Woosuk Kwon, Zhuohan Li, Siyuan Zhuang, et al.',
    venue: 'SOSP',
    year: 2023,
    topic: 'PagedAttention/vLLM',
    link: 'https://arxiv.org/abs/2309.06180',
    color: 'from-emerald-600 via-teal-500 to-cyan-600',
    accentColor: 'text-emerald-600',
  },
];

function PaperCard({ paper, index }: { paper: Paper; index: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      {/* Colored header with topic */}
      <div className={`bg-gradient-to-r ${paper.color} px-6 py-4`}>
        <div className="flex items-center justify-between">
          <span className="text-white text-lg font-bold tracking-wide">{paper.topic}</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-medium">
            {paper.venue} {paper.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 leading-snug">
          {paper.title}
        </h3>

        {/* Authors */}
        <p className="text-sm text-gray-500">{paper.authors}</p>

        {/* Link */}
        <a
          href={paper.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 ${paper.accentColor} font-medium hover:underline text-sm`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          Read on arXiv
        </a>
      </div>
    </div>
  );
}

function PapersContent() {
  return (
    <div className="space-y-6">
      {papers.map((paper, index) => (
        <PaperCard key={paper.id} paper={paper} index={index} />
      ))}
    </div>
  );
}

function AIPerformanceContent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="space-y-6">
      {/* Book Hero Section */}
      <div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease-out',
        }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">📚</span>
            <h2 className="text-2xl font-semibold">AI Systems Performance Engineering</h2>
          </div>
          <p className="text-white/90 max-w-2xl leading-relaxed mb-2">
            <span className="font-medium">by Chris Fregly</span>
          </p>
          <p className="text-white/80 max-w-2xl leading-relaxed mb-6 text-sm">
            A comprehensive guide to optimizing model training and inference workloads with GPUs, CUDA, and PyTorch.
          </p>
          <a
            href="https://www.amazon.com/Systems-Performance-Engineering-Optimizing-Inference/dp/B0F47689K8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-emerald-600 rounded-lg font-medium hover:bg-white/90 transition-colors shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            View on Amazon
          </a>
        </div>
      </div>

      {/* Reading Notes */}
      <div
        className="space-y-4"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease-out 0.2s',
        }}
      >
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <span className="w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
          Reading Notes
        </h3>

        <div className="space-y-3">
          {/* Chapter 1 */}
          <div className="group rounded-xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:shadow-md hover:border-emerald-200">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-semibold text-sm">
                1
              </span>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Chapter 1. Introduction and AI System Overview</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Explores the emerging role of AI systems engineers and presents a compelling vision for the future—building
                  infrastructure capable of supporting models with 100 trillion parameters and beyond.
                </p>
              </div>
            </div>
          </div>

          {/* Chapter 2 */}
          <div className="group rounded-xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:shadow-md hover:border-emerald-200">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-semibold text-sm">
                2
              </span>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Chapter 2. AI System Hardware Overview</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Deep dive into NVIDIA's GPU architectures powering modern AI workloads, including the H100, B200,
                  and the NVL72 multi-GPU system designed for large-scale training and inference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TritonContent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease-out',
      }}
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🚀</span>
          <h2 className="text-2xl font-semibold">Learning Triton GPU Kernels</h2>
        </div>
        <p className="text-white/90 max-w-2xl leading-relaxed mb-6">
          Triton is a language and compiler for writing highly efficient custom Deep Learning primitives.
          It enables researchers and engineers to write GPU code at a higher level of abstraction while
          achieving performance comparable to hand-tuned CUDA kernels.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/ssydyc2/learn_triton"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-white/90 transition-colors shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            My Implementations
          </a>
          <a
            href="https://triton-lang.org/main/getting-started/tutorials/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors border border-white/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Official Tutorials
          </a>
        </div>
      </div>
    </div>
  );
}

interface Section {
  id: string;
  title: string;
  content: ReactNode;
}

const sections: Section[] = [
  {
    id: 'triton',
    title: 'Triton Kernel',
    content: <TritonContent />,
  },
  {
    id: 'resources',
    title: 'AI Performance Engineer',
    content: <AIPerformanceContent />,
  },
  {
    id: 'papers',
    title: 'Important Papers',
    content: <PapersContent />,
  },
];

export default function Journey() {
  const [activeTab, setActiveTab] = useState(sections[0].id);
  const activeSection = sections.find((s) => s.id === activeTab);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-light text-gray-900">
        Personal Growth
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
