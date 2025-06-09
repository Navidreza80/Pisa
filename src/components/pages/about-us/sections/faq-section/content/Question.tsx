// React
import React from "react";

// Types
import type QuestionProps from "@/types/about-us";

/**
 * About us FAQ section
 *
 * @component
 * @param {QuestionProps} props - Component props
 * @returns {JSX.Element} - Rendered next elite image
 */

function Question({ title, desc }: QuestionProps) {
  return (
    <section className="bg-surface p-6 rounded-xl">
      <h3 className="text-xl font-bold text-text mb-3">{title}</h3>
      <p className="text-secondary">{desc}</p>
    </section>
  );
}

export default React.memo(Question);
