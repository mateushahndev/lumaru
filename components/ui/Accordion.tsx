"use client";

import { useState, ReactNode } from "react";

interface AccordionItem {
  id: number;
  question: string;
  answer: ReactNode;
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
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${item.id}`}
          >
            <span className="text-sm md:text-base font-medium text-text hover:text-primary transition-colors duration-300">
              {item.question}
            </span>
            <span
              className={`text-primary text-xl transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            >
              ▾
            </span>
          </button>
          <div
            id={`faq-answer-${item.id}`}
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96 pb-4" : "max-h-0"
            }`}
            aria-hidden={openIndex !== index}
          >
            <div className="text-sm text-text/70 leading-relaxed">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}