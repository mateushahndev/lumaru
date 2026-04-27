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
      "15ml is the industry-standard size for eye creams because you only need a rice-grain sized amount per application — it lasts 2 to 3 months. For comparison, Kiehl's and Estée Lauder charge $50–$76 for the same 15ml. At $35.90 with certified organic ingredients and our 30-day guarantee, it's one of the most honest prices in the premium eye care space.",
  },
  {
    id: 3,
    question: "I have sensitive skin. Will this irritate me?",
    answer:
      "The formula is 100% free from parabens, sulfates, synthetic fragrances, and harsh actives. It's COSMOS certified and formulated for the most delicate skin area on your face. All three actives — Shea Butter, Ginkgo Biloba, and Horse Chestnut — are natural and skin-compatible. If you've had reactions to retinol-based creams or strong chemical exfoliants in the past, you'll find this a significantly gentler experience.",
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
      "Hydration is immediate — your under-eye area will feel softer and more plumped after the first use. Puffiness typically reduces visibly within the first week. For dark circles, consistent twice-daily use shows meaningful brightness improvement at the 3 to 4 week mark. That's why we offer a 30-day guarantee — enough time to see real results.",
  },
  {
    id: 6,
    question: "What if it doesn't work for me?",
    answer:
      "Simple: full refund, no questions asked, within 30 days. We stand behind the formula. If you try it consistently and don't see a visible difference, contact us and we'll make it right. We'd rather lose a sale than keep a customer who isn't satisfied.",
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