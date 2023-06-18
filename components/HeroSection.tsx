// HeroSection.tsx
import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => {
  return (
    <div className="hero-section text-center">
      <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
        {title}
      </h1>
      <p className="text-slate-500 mt-5">{subtitle}</p>
    </div>
  );
};

export default HeroSection;
