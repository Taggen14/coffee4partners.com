import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div data-searchable="true" className="relative group">
      {/* Card */}
      <div className="relative bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl z-10">
        {/* Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
        <div className="absolute inset-[2px] bg-white rounded-2xl -z-10" />

        {/* Icon */}
        <div className="mb-6 relative">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
              {icon}
            </span>
          </div>
          <div className="absolute -inset-4 bg-blue-600/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
          {title}
        </h4>
        <p className="text-gray-600 leading-relaxed">{description}</p>

        {/* Hover Effect */}
        <div className="absolute bottom-0 left-4 right-4 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
      </div>

      {/* Background Decoration */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </div>
  );
};

export default FeatureCard;
