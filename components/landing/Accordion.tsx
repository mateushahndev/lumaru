"use client";

import { useState } from "react";

interface AccordionItem {
  id: number;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="border-b border-primary-light/20 transition-all duration-300"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full py-4 md:py-5 text-left flex justify-between items-center group"
          >
            <span className="text-sm md:text-base font-medium text-text hover:text-primary transition-colors duration-300">
              {item.question}
            </span>
            <span
              className={`text-primary text-xl transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96 pb-4" : "max-h-0"
            }`}
          >
            <p className="text-sm text-text/70 leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}