interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="border-b border-gray-100 pb-8 last:border-0">
      <h2 className="text-xl font-medium text-gray-900 mb-4">{title}</h2>
      <div className="text-gray-600 leading-relaxed">{children}</div>
    </section>
  );
}

export default function Journey() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-light text-gray-900">
        Journey to Performance Engineer
      </h1>

      <div className="space-y-8">
        <Section title="Triton Kernel">
          <p>
            Content coming soon.
          </p>
        </Section>

        <Section title="Post Training">
          <p>
            Content coming soon.
          </p>
        </Section>

        <Section title="Learning Resources">
          <p>
            Content coming soon.
          </p>
        </Section>
      </div>
    </div>
  );
}
