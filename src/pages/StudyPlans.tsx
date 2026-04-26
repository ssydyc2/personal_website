import { useState } from 'react';

interface Resource {
  title: string;
  href: string;
  meta?: string;
  notes: string[];
}

interface Phase {
  title: string;
  period: string;
  summary: string;
  groups: {
    title?: string;
    resources: Resource[];
  }[];
}

interface StudyPlan {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  readingChecklist: string[];
  phases: Phase[];
  frameworkRows: string[][];
  practicePath: string[];
  minimalPath: string[];
  topThree: string[];
  keyConcepts: string;
}

const readingChecklist = [
  'Architecture: rollout, generation, and training worker organization',
  'Sync vs async: coupled generation-training loop or decoupled pipeline',
  'Resource management: colocated vs disaggregated GPU allocation',
  'Communication: weight and experience transfer between components',
  'Scalability: primary bottleneck and mitigation strategy',
  'Algorithm support: PPO, DPO, GRPO, or other approaches',
];

const phases: Phase[] = [
  {
    title: 'Algorithm Foundations',
    period: 'Days 1-3',
    summary: 'Understand the core RL alignment algorithms before diving into systems.',
    groups: [
      {
        resources: [
          {
            title: 'Training language models to follow instructions with human feedback',
            href: 'https://arxiv.org/abs/2203.02155',
            meta: 'InstructGPT, OpenAI, 2022',
            notes: [
              'Foundational PPO-based RLHF paper.',
              'Covers reward model training, PPO fine-tuning, and KL penalty.',
              'Read first because later systems build on or depart from this setup.',
            ],
          },
          {
            title: 'Direct Preference Optimization: Your Language Model is Secretly a Reward Model',
            href: 'https://arxiv.org/abs/2305.18290',
            meta: 'DPO, Rafailov et al., 2023',
            notes: [
              'Eliminates the reward model and RL loop.',
              'Reparameterizes RLHF as a classification loss on preference pairs.',
              'Key insight: KL-constrained reward maximization has a closed-form policy relationship.',
            ],
          },
          {
            title: 'DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models',
            href: 'https://arxiv.org/abs/2402.03300',
            meta: 'DeepSeek, 2024',
            notes: [
              'Introduces Group Relative Policy Optimization.',
              'Removes the critic model by estimating baselines from group scores.',
              'Important context for modern reasoning RL methods such as DeepSeek-R1 and Qwen.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'RLHF Systems & Frameworks',
    period: 'Days 4-8',
    summary: 'Read one flexible dataflow view, one async systems view, one practical distributed stack, then lineage.',
    groups: [
      {
        title: 'Core Framework Papers',
        resources: [
          {
            title: 'HybridFlow: A Flexible and Efficient RLHF Framework',
            href: 'https://arxiv.org/abs/2409.19256',
            meta: 'verl',
            notes: [
              'Canonical paper behind the verl framework.',
              'Mixes single-controller flexibility with multi-controller efficiency.',
              'Introduces 3D-HybridEngine for colocating actor training and generation.',
            ],
          },
          {
            title: 'AReaL: A Large-Scale Asynchronous Reinforcement Learning System for Language Reasoning',
            href: 'https://arxiv.org/abs/2504.02792',
            meta: '2025',
            notes: [
              'Fully asynchronous RL system that decouples generation and training.',
              'Targets the GPU utilization problem in synchronous rollout pipelines.',
              'Read as the async alternative to HybridFlow-style colocation.',
            ],
          },
          {
            title: 'OpenRLHF: An Easy-to-use, Scalable and High-performance RLHF Framework',
            href: 'https://arxiv.org/abs/2405.11143',
            meta: '2024',
            notes: [
              'Ray and vLLM based distributed RLHF framework.',
              'Uses disaggregated placement for actor, critic, reward, and reference models.',
              'Good practical reference implementation for open-source RLHF.',
            ],
          },
          {
            title: 'ReaLHF: Optimized RLHF Training for Large Language Models through Parameter Reallocation',
            href: 'https://arxiv.org/abs/2406.14088',
            meta: '2024',
            notes: [
              'Predecessor and lineage for AReaL.',
              'Dynamically reallocates model parameters across GPUs between generation and training.',
              'Useful historical context for the evolution toward AReaL.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Library-Based Frameworks',
    period: 'Days 9-11',
    summary: 'These are mostly toolkits. Read docs and code, then run at least one small example.',
    groups: [
      {
        resources: [
          {
            title: 'TRL (Transformer Reinforcement Learning)',
            href: 'https://huggingface.co/docs/trl/',
            meta: 'HuggingFace',
            notes: [
              'Post-training library with DPO, PPO, GRPO, KTO, and more.',
              'Best for quick experiments and single-node or small multi-GPU setups.',
              'Action: run a DPO or GRPO example end-to-end.',
            ],
          },
          {
            title: 'NeMo-Aligner',
            href: 'https://github.com/NVIDIA/NeMo-Aligner',
            meta: 'NVIDIA',
            notes: [
              'Scalable alignment toolkit built on NeMo.',
              'Supports DPO, PPO, and RLHF at scale with Megatron parallelism.',
              'Action: understand how it handles model parallelism for RLHF.',
            ],
          },
          {
            title: 'torchtune',
            href: 'https://github.com/pytorch/torchtune',
            meta: 'PyTorch',
            notes: [
              'PyTorch-native post-training library.',
              'Includes DPO, PPO, and GRPO recipes.',
              'Action: read the recipe structure and config system.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Synthesis & Practice',
    period: 'Days 12-14',
    summary: 'Connect the conceptual landscape, hands-on training, scaling lessons, and code reading.',
    groups: [
      {
        title: 'Conceptual Overview & Landscape',
        resources: [
          {
            title: 'Understanding Reasoning LLMs',
            href: 'https://magazine.sebastianraschka.com/p/understanding-reasoning-llms',
            meta: 'Sebastian Raschka',
            notes: [
              'Taxonomy of inference-time scaling, pure RL, SFT plus RL, and distillation.',
              'Useful for deciding which reasoning approach fits a use case.',
            ],
          },
          {
            title: 'RLHF Book',
            href: 'https://rlhfbook.com/',
            meta: 'Nathan Lambert',
            notes: [
              'Free online book covering the RLHF pipeline end-to-end.',
              'Lecture 4 on RL implementation and practice is especially useful.',
            ],
          },
          {
            title: 'Interconnects AI - RLHF tag',
            href: 'https://www.interconnects.ai/t/rlhf',
            meta: 'Nathan Lambert',
            notes: [
              'Builder-oriented writing on PPO, DPO, GRPO, DeepSeek-R1, and infrastructure challenges.',
            ],
          },
        ],
      },
      {
        title: 'Hands-On GRPO Training',
        resources: [
          {
            title: 'Unsloth - Train Your Own R1 Reasoning Model with GRPO',
            href: 'https://unsloth.ai/blog/r1-reasoning',
            meta: 'Beginner-friendly experiment path',
            notes: [
              'End-to-end GRPO on consumer hardware with Colab notebooks.',
              'Supports Llama 3.1 8B, Qwen 2.5, and Phi-4 with QLoRA.',
              'Lowest barrier to entry for a first GRPO experiment.',
            ],
          },
          {
            title: 'TinyZero - Reproduce DeepSeek R1-Zero for Under $30',
            href: 'https://github.com/Jiayi-Pan/TinyZero',
            meta: 'Minimal R1-Zero reproduction',
            notes: [
              'Built on veRL and focused on countdown and multiplication tasks.',
              'Shows reasoning emergence from RL alone, without instruction tuning.',
            ],
          },
          {
            title: 'The One Big Beautiful Blog on GRPO',
            href: 'https://pramodith.github.io/posts/grpo-trainer/',
            meta: 'Pramodith',
            notes: [
              'Deep dive into GRPO internals with PyTorch code.',
              'Covers model architecture, rewards, group-relative advantages, and trainer behavior.',
            ],
          },
        ],
      },
      {
        title: 'Scaling & Engineering Lessons',
        resources: [
          {
            title: 'HuggingFace Open-R1: Update #1',
            href: 'https://huggingface.co/blog/open-r1/update-1',
            meta: 'GRPO at scale',
            notes: [
              'Lessons from replicating DeepSeek-R1 with GRPO via TRL.',
              'Covers vLLM scaling, GPU memory pressure, long reasoning outputs, and generation strategy.',
            ],
          },
          {
            title: 'DPO Alignment with TRL',
            href: 'https://www.philschmid.de/dpo-align-llms-in-2024-with-trl',
            meta: 'Philipp Schmid',
            notes: [
              'End-to-end DPO walkthrough covering data, quantization, LoRA training, and evaluation.',
              'Clean alignment tutorial with transferable evaluation methodology.',
            ],
          },
          {
            title: 'Training for Reasoning with GRPO',
            href: 'https://pub.towardsai.net/training-your-reasoning-model-with-grpo-a-practical-guide-for-vlms-post-training-with-trl-266411c0b844',
            meta: 'Towards AI',
            notes: [
              'GRPO post-training guide focused on vision-language models.',
              'One of the few resources covering multimodal GRPO practice.',
            ],
          },
        ],
      },
    ],
  },
];

const frameworkRows = [
  ['verl', 'HybridFlow', 'Synchronous colocated', 'Same GPUs', 'HybridFlow paper'],
  ['AReaL', 'AReaL', 'Asynchronous', 'Disaggregated', 'AReaL paper'],
  ['OpenRLHF', 'OpenRLHF', 'Synchronous disaggregated', 'Separate GPU clusters', 'OpenRLHF paper'],
  ['ReaLHF', 'ReaLHF', 'Synchronous dynamic realloc', 'Dynamically reallocated', 'ReaLHF paper'],
  ['TRL', 'No system paper', 'Single-node focused', 'Colocated', 'Docs plus DPO/PPO papers'],
  ['NeMo-Aligner', 'No system paper', 'Scale-focused toolkit', 'Megatron-scale', 'Docs plus algorithm papers'],
  ['torchtune', 'No system paper', 'Recipe-focused toolkit', 'PyTorch-native', 'Docs plus recipes'],
];

const practicePath = [
  "Raschka's overview - understand the landscape before training anything",
  'Unsloth GRPO tutorial - first hands-on experiment',
  "Pramodith's GRPO blog - understand what the trainer does",
  'Open-R1 Update #1 - learn scaling lessons before multi-GPU work',
  'TinyZero on veRL - reproduce R1-Zero and bridge to production frameworks',
];

const minimalPath = [
  'InstructGPT for PPO/RLHF background',
  'DPO for the major non-RL alternative',
  'HybridFlow for colocated synchronous systems',
  'AReaL for asynchronous systems',
  'OpenRLHF for practical disaggregated systems',
  'GRPO / DeepSeekMath for modern reasoning RL',
];

const topThree = [
  'HybridFlow for RLHF dataflow',
  'DPO for non-PPO alignment',
  'AReaL for async systems',
];

const keyConcepts = `Efficient RL for LLMs
|-- Algorithms
|   |-- PPO-based RLHF: reward model, KL-constrained policy optimization, critic
|   |-- DPO: preference pairs to classification loss
|   |-- GRPO: critic-free group-relative advantage estimation
|-- System Design Axes
|   |-- Sync vs Async: simplicity vs utilization and staleness
|   |-- Resource Placement: colocated, disaggregated, dynamic reallocation
|   |-- Communication: weights, experiences, parameter server vs all-reduce
|-- Practical Stacks
    |-- verl, OpenRLHF, TRL, NeMo-Aligner, torchtune`;

const studyPlans: StudyPlan[] = [
  {
    id: 'efficient-rl-for-llms',
    title: 'Efficient RL for LLMs',
    eyebrow: 'Two-week plan',
    summary:
      'A structured path for learning RLHF and RL systems for LLM alignment, moving from algorithms to distributed systems, frameworks, and hands-on practice.',
    readingChecklist,
    phases,
    frameworkRows,
    practicePath,
    minimalPath,
    topThree,
    keyConcepts,
  },
];

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
      <div className="space-y-2">
        <a
          href={resource.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-medium leading-snug text-gray-900 hover:text-indigo-700"
        >
          {resource.title}
        </a>
        {resource.meta && (
          <p className="text-sm tracking-wide text-gray-400">{resource.meta}</p>
        )}
      </div>
      <ul className="mt-4 space-y-2">
        {resource.notes.map((note) => (
          <li key={note} className="flex gap-3 text-sm leading-relaxed text-gray-600">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-300" />
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function PhaseSection({ phase, index }: { phase: Phase; index: number }) {
  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-2 border-b border-gray-100 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600">Phase {index + 1}</p>
          <h2 className="text-2xl font-light text-gray-900">{phase.title}</h2>
        </div>
        <span className="text-sm text-gray-400">{phase.period}</span>
      </div>
      <p className="text-gray-600 leading-relaxed">{phase.summary}</p>
      <div className="space-y-6">
        {phase.groups.map((group) => (
          <div key={group.title ?? phase.title} className="space-y-4">
            {group.title && (
              <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
                {group.title}
              </h3>
            )}
            <div className="grid gap-4">
              {group.resources.map((resource) => (
                <ResourceCard key={resource.title} resource={resource} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StudyPlanDetail({ plan }: { plan: StudyPlan }) {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-wide text-gray-400">
          {plan.eyebrow}
        </p>
        <h1 className="text-3xl font-light text-gray-900">{plan.title}</h1>
        <p className="max-w-3xl text-gray-600 leading-relaxed">{plan.summary}</p>
      </header>

      <section className="rounded-lg border border-gray-100 bg-gray-50 p-5">
        <h2 className="text-lg font-medium text-gray-900">Reading Checklist</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {plan.readingChecklist.map((item) => (
            <div key={item} className="rounded-md bg-white p-3 text-sm leading-relaxed text-gray-600">
              {item}
            </div>
          ))}
        </div>
      </section>

      {plan.phases.map((phase, index) => (
        <PhaseSection key={phase.title} phase={phase} index={index} />
      ))}

      <section className="space-y-4">
        <h2 className="text-2xl font-light text-gray-900">Framework Comparison</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Framework</th>
                <th className="px-4 py-3 font-medium">Canonical Paper</th>
                <th className="px-4 py-3 font-medium">Sync/Async</th>
                <th className="px-4 py-3 font-medium">Placement</th>
                <th className="px-4 py-3 font-medium">Read First</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white text-gray-600">
              {plan.frameworkRows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell} className="px-4 py-3 align-top">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900">Suggested Practice Path</h2>
          <ol className="mt-4 space-y-3">
            {plan.practicePath.map((item, index) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-600">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-medium text-indigo-700">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900">Minimal Path</h2>
          <ol className="mt-4 space-y-3">
            {plan.minimalPath.map((item, index) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-600">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-medium text-gray-900">Top 3 If Short on Time</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {plan.topThree.map((item) => (
            <div key={item} className="rounded-md bg-gray-50 p-3 text-sm leading-relaxed text-gray-600">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-gray-100 bg-gray-950 p-5 text-gray-100 shadow-sm">
        <h2 className="text-lg font-medium">Key Concepts Map</h2>
        <pre className="mt-4 overflow-x-auto whitespace-pre text-xs leading-relaxed text-gray-300">
          {plan.keyConcepts}
        </pre>
      </section>
    </div>
  );
}

export default function StudyPlans() {
  const [activePlanId, setActivePlanId] = useState(studyPlans[0].id);
  const activePlan = studyPlans.find((plan) => plan.id === activePlanId) ?? studyPlans[0];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-light text-gray-900">Study Plans</h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="lg:w-44 lg:shrink-0">
          <nav className="flex gap-2 overflow-x-auto border-b border-gray-100 pb-3 lg:sticky lg:top-6 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">
            {studyPlans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setActivePlanId(plan.id)}
                className={`min-w-44 border-l-2 px-3 py-2 text-left transition-colors lg:min-w-0 ${
                  activePlan.id === plan.id
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className="block text-sm font-medium">{plan.title}</span>
                <span className="mt-1 block text-xs uppercase tracking-wide text-gray-400">
                  {plan.eyebrow}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <StudyPlanDetail plan={activePlan} />
        </div>
      </div>
    </div>
  );
}
