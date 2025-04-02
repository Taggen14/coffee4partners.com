const Stats = () => {
  const stats = [
    { number: "15+", label: "Års Erfarenhet", icon: "🏆" },
    { number: "20k", label: "Portar 2023", icon: "🚪" },
    { number: "50+", label: "Länder", icon: "🌍" },
  ];

  return (
    <div className="grid grid-cols-3 gap-8 my-16 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="text-4xl mb-3">{stat.icon}</div>
          <div className="text-5xl font-bold text-primary-content mb-2">
            {stat.number}
          </div>
          <div className="text-sm text-gray-600 uppercase tracking-wider font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
