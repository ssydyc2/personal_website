import { useState, useEffect } from 'react';

export default function AIPerformanceContent() {
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
