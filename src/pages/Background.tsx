export default function Background() {
  const timelineData = [
    {
      period: "2014 - 2018",
      title: "Ph.D. in Operations Research",
      description: "Focused on theoretical optimization problem",
    },
    {
      period: "2018 - 2020",
      title: "Software Engineer, Infrastructure",
      company: "Snap Inc.",
      description: "Built service mesh infrastructure powering real-time communication for hundreds of millions of users.",
    },
    {
      period: "2020 - 2022",
      title: "Machine Learning Engineer",
      company: "Snap Inc.",
      description: "Developed machine learning models for friending suggestions and notification optimization.",
    },
    {
      period: "2022 - 2025",
      title: "Software Engineer, Machine Learning",
      company: "Meta Inc.",
      description: "Trained and deployed machine learning models for ads systems.",
    },
    {
      period: "2025 - Present",
      title: "Software Engineer, Machine Learning",
      company: "Meta Inc.",
      description: "Working on classifiers and safety eval to block unsafe contents generated from AI.",
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-light text-gray-900">Background</h1>

      <div className="space-y-6">
        {timelineData.map((item, index) => (
          <div key={index} className="border-l-2 border-indigo-300 pl-4">
            <div className="text-sm text-indigo-600 font-medium">{item.period}</div>
            <div className="text-lg font-semibold text-gray-900">{item.title}</div>
            {item.company && (
              <div className="text-sm text-gray-500">{item.company}</div>
            )}
            <p className="text-gray-600 mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
