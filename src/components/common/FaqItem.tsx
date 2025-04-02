"use client";

import { useState } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="collapse collapse-arrow bg-white shadow-sm hover:shadow-md transition-all duration-200">
      <input
        type="checkbox"
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
        className="peer"
      />
      <div className="collapse-title text-lg font-medium text-gray-900 flex items-center justify-between pr-4">
        {question}
      </div>
      <div className="collapse-content text-gray-600">
        <p className="pt-2">{answer}</p>
      </div>
    </div>
  );
}
