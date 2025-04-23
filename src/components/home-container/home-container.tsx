import Offers from "./offers/offers";
import HeroSection from "./hero-section/hero-section";
import Category from "./category/Category";
import TopSales from "./topSale/TopSale";
import Rank from "./Rank/Rank";
import Popular from "./popular/Popular";

export default async function HomeContainer() {
  return (
    <div className="flex flex-col flex-wrap gap-[100px]">
      <HeroSection />
      <Offers />
      <Category />
      <TopSales />
      <Rank />
      <Popular />
    </div>
  );
}
