"use client";

import { useEffect, useRef } from "react";
import Accordion from "../ui/Accordion";

const faqItems = [
  {
    id: 1,
    question: "I've tried dozens of eye creams. Why would this one be any different?",
    answer:
      "Most eye creams address the surface — they moisturize without targeting the root causes of dark circles and puffiness. The Awake Eye Complex works differently: Ginkgo Biloba activates microcirculation to move stagnant blood, and Horse Chestnut strengthens the vessels to prevent fluid buildup. It's not a moisturizer with a fancy name. It's a formula built for the specific biology of the under-eye area.",
  },
  {
    id: 2,
    question: "Is $35.90 worth it for only 15ml?",
    answer:
      "15ml is the industry-standard size for eye creams because a rice-grain sized amount is all you need per application — a little goes a long way. Compared to other premium eye creams with similar organic certifications, the Awake Eye Complex delivers the same quality at a fairer price. No luxury markup. Just honest skincare.",
  },
  {
    id: 3,
    question: "I have sensitive skin. Will this irritate me?",
    answer:
      "The formula is 100% free from parabens, sulfates, and harsh actives. The delicate natural fragrance comes only from essential oils — never synthetics. It's COSMOS certified and formulated for the most delicate skin area on your face. All active ingredients — Shea Butter, Ginkgo Biloba, Horse Chestnut, and Hyaluronic Acid — are natural and skin-compatible. If you've had reactions to retinol-based creams or strong chemical exfoliants in the past, you'll find this a significantly gentler experience.",
  },
  {
    id: 4,
    question: "My dark circles are genetic. Can this actually help?",
    answer:
      "Genetic dark circles have two main contributors: thin skin that makes vessels visible, and reduced microcirculation that allows pigmented blood to pool. The Micro-Circulation Awakening Complex targets both. While no cream eliminates genetic factors entirely, consistent use visibly brightens and firms the under-eye area — reducing the intensity of darkness regardless of its origin.",
  },
  {
    id: 5,
    question: "How long until I see results?",
    answer:
      "Hydration is immediate — multi-molecular Hyaluronic Acid delivers instant plumpness, so your under-eye area feels softer from the first use. Puffiness typically goes down within the first week. For dark circles, consistent twice-daily use brings visible brightening week by week. Stick with it — the longer you use it, the better it gets.",
  },
  {
    id: 6,
    question: "What if it doesn't work for me?",
    answer:
      "We stand behind the formula. If you try it consistently and don't see a visible difference, contact us and we'll make it right. Your satisfaction matters more to us than a sale.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="my-16 md:my-20 opacity-0">
      <h2 className="text-3xl md:text-4xl font-medium text-center mb-10 text-text">
        Frequently asked questions
      </h2>
      <Accordion items={faqItems} />
    </section>
  );
}