import { ReactElement } from "react";

interface IconContainerProps {
  index: number;
  icon: ReactElement;
  title: string;
  description: string;
}

export const IconContainer = (feature: IconContainerProps) => {
  return (
    <div key={feature.index} className="relative group">
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="text-blue-600 mb-4">{feature.icon}</div>
        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
        <p className="text-gray-600 text-sm">{feature.description}</p>
      </div>
    </div>
  );
};
