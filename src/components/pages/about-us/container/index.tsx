"use client";

import "leaflet/dist/leaflet.css";
import FeaturesSection from "../sections/features-section/container";
import OurMissionSection from "../sections/our-misssion-section/container";
import OurServicesSection from "../sections/our-services-section/container";
import TeamMemberSection from "../sections/team-member-section/container";
import FaqSection from "../sections/faq-section/container";

export default function AboutUsPageContainer() {
  return (
    <main className="min-h-screen py-[20px] mx-auto w-[85.5%]">
      <div className="w-full">
        {/* Hero section */}
        <TeamMemberSection />

        {/* Our mission */}
        <OurMissionSection />

        {/* Our services */}
        <OurServicesSection />

        {/* Features section */}
        <FeaturesSection />

        {/* FAQ section */}
        <FaqSection />
      </div>
    </main>
  );
}
