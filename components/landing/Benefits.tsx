"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const benefits = [
  {
    id: 1,
    label: "Deep Hydration",
    title: "Skin so hydrated, your under-eyes stop looking hollow and creased",
    description:
      "Organic Shea Butter builds a protective barrier that locks moisture deep into the skin — the kind that plumps from within. When the under-eye area is truly hydrated, it stops looking hollow, creased, and exhausted. One application. All day.",
    imageLabel: "Shea Butter — Deep moisture lock",
    imageSrc: "/images/benefits/shea-nut.webp",
    reverse: false,
  },
  {
    id: 2,
    label: "Fades Dark Circles",
    title: "The real reason your dark circles won't fade — and what finally fixes it",
    description:
      "Dark circles aren't just pigmentation. They're stagnant blood pooling under thin skin. Ginkgo Biloba Extract activates your skin's microcirculation — flushing out what causes that blue-purple tint and restoring the natural brightness that makes eyes look alive. This is why other creams failed you. This is what 'awake' actually looks like.",
    imageLabel: "Ginkgo Biloba — Microcirculation activator",
    imageSrc: "/images/benefits/ginkgo-biloba.webp",
    reverse: true,
  },
  {
    id: 3,
    label: "De-Puffs Instantly",
    title: "Wake up de-puffed. Even after a bad night.",
    description:
      "Horse Chestnut Extract strengthens fragile capillary walls and drains excess fluid — the exact cause of morning puffiness. Apply before bed. Wake up to eyes that look rested, awake, and yours again. Not puffy. Not tired. Not 'are you okay?' — just you, at your best.",
    imageLabel: "Horse Chestnut — Anti-puffiness complex",
    imageSrc: "/images/benefits/horse-chestnut.webp",
    reverse: false,
  },
];

export default function Benefits() {
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

  const handleCTAClick = (benefitId: number) => {
    document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="my-16 md:my-20 opacity-0">
      <div className="space-y-16 md:space-y-20">
        {benefits.map((benefit, index) => (
          <div
            key={benefit.id}
            className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
              benefit.reverse ? "md:direction-rtl" : ""
            }`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Image Block */}
            <div className={benefit.reverse ? "md:order-last" : ""}>
              <div className="bg-gradient-to-br from-primary-light/20 to-primary-light/5 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
                {/* Container com altura automática para respeitar proporção da imagem */}
                <div className="relative w-full rounded-2xl overflow-hidden">
                  <Image
                    src={benefit.imageSrc}
                    alt={benefit.imageLabel}
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-2xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="text-sm text-primary/70 font-medium mt-4">
                  {benefit.imageLabel}
                </div>
              </div>
            </div>

            {/* Content Block */}
            <div className="space-y-4">
              <div className="text-xs font-semibold tracking-wider text-primary uppercase">
                {benefit.label}
              </div>
              <h3 className="text-2xl md:text-3xl font-medium leading-[1.3] text-text">
                {benefit.title}
              </h3>
              <p className="text-base text-text/70 leading-relaxed">
                {benefit.description}
              </p>
              <button
                onClick={() => handleCTAClick(benefit.id)}
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                {benefit.id === 1 && "Get Awake Eye Complex →"}
                {benefit.id === 2 && "Try the Difference →"}
                {benefit.id === 3 && "Wake Up Different →"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}