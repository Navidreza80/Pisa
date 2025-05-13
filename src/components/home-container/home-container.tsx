import { HouseItemsInterface } from "@/types/house";
import { fetchHouses } from "@/utils/service/house/get";
import Container from "../common/container";
import Rank from "./Rank/Rank";
import Category from "./category/Category";
import HeroSection from "./hero-section/hero-section";
import Popular from "./locations/locations";
import Offers from "./offers/offers";
import TopSales from "./topSale/TopSale";
// import Comments from "./comments/Comments";
import AIAssistant from "./ai-assistant/ai-assistant";

export default async function HomeContainer() {
  const data: HouseItemsInterface[] = await fetchHouses({
    transactionType: "",
  });
  const tehranHouses = data.filter((e) => e.address?.includes("تهران")).length;
  const shirazHouses = data.filter((e) => e.address?.includes("شیراز")).length;
  const esfahanHouses = data.filter((e) =>
    e.address?.includes("اصفهان")
  ).length;
  const houseLength = data.length
  return (
    <Container>
      <div className="flex flex-col flex-wrap gap-[118px] w-[85.5%]">
        <HeroSection />
        <div className="animate-[var(--animation-content-pop)] [animation-timeline:scroll(root)] [animation-range:200px_600px] flex flex-col flex-wrap gap-[120px]">
          <Offers data={data} />
          <Category />
          <TopSales data={data} />
          <Rank />
          <Popular
            tehranHouses={tehranHouses}
            shirazHouses={shirazHouses}
            esfahanHouses={esfahanHouses}
          />
          <AIAssistant houseLength={houseLength} />
          {/* <Comments /> */}
        </div>
      </div>
    </Container>
  );
}
