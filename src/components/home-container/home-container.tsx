import Offers from "./offers/offers";
import HeroSection from "./hero-section/hero-section";
import Category from "./category/Category";
import TopSales from "./topSale/TopSale";
import Rank from "./Rank/Rank";
import Popular from "./locations/locations";
import { getAllHouse } from "@/utils/service/house/get-all-house";

export default async function HomeContainer() {
  const data = await getAllHouse(1, 3, "rate", "DESC", "", "");
  return (
    <div className="flex flex-col flex-wrap gap-[20px]">
      <HeroSection />
      <div className="animate-[var(--animation-content-pop)] [animation-timeline:scroll(root)] [animation-range:200px_600px] flex flex-col flex-wrap gap-[100px]">
        <Offers data={data} />
        <Category />
        <TopSales data={data} />
        <Rank />
        <Popular />
      </div>
    </div>
  );
}
