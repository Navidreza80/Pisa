import Offers from "./offers/offers";
import HeroSection from "./hero-section/hero-section";

export default async function HomeContainer() {
  return (
    <div>
      <HeroSection />
      <Offers />
    </div>
  );
}
