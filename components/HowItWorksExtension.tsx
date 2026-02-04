
import React from 'react';
import CardSwap, { Card } from './CardSwap';

export default function HowItWorksExtension() {
  return (
    <section className="relative w-full bg-[rgb(17,17,17)] pt-32 pb-0 overflow-visible z-20">
      <div className="max-w-[1200px] mx-auto px-[48px] relative h-[480px]">
        {/* CardSwap is set to absolute bottom-0 right-0 inside its own component */}
        <CardSwap
          width={460}
          height={320}
          cardDistance={60}
          verticalDistance={70}
          delay={3500}
          pauseOnHover={false}
          skewAmount={6}
          easing="elastic"
        >
          <Card className="border border-[#E02424] bg-black text-white p-10">
            <h3 className="text-5xl font-semibold text-[#E02424]">95%</h3>
            <p className="mt-6 text-sm text-gray-400 max-w-[280px]">
              Measured across delivered projects
            </p>
          </Card>

          <Card className="border border-[#E02424] bg-black text-white p-10">
            <h3 className="text-5xl font-semibold text-[#E02424]">2+ Years</h3>
            <p className="mt-6 text-sm text-gray-400 max-w-[280px]">
              Hands-on execution, not theory
            </p>
          </Card>

          <Card className="border border-[#E02424] bg-black text-white p-10">
            <h3 className="text-5xl font-semibold text-[#E02424]">Global</h3>
            <p className="mt-6 text-sm text-gray-400 max-w-[280px]">
              Worked across regions and time zones
            </p>
          </Card>

          <Card className="border border-[#E02424] bg-black text-white p-10">
            <h3 className="text-5xl font-semibold text-[#E02424]">Premium</h3>
            <p className="mt-6 text-sm text-gray-400 max-w-[280px]">
              Structured, calm, and guided from day one
            </p>
          </Card>
        </CardSwap>
      </div>
    </section>
  );
}
