import { HouseItemsInterface } from "@/types/house";
import { fetchHouses } from "@/utils/service/house/get";
import Container from "@/components/common/container";
import PropertyAgentSection from "../sections/property-agent-section/container";
import HeroSection from "../sections/hero-section/container";
import Offers from "../sections/offers-section/container";
import Category from "../sections/categories-section/container";
import TopSales from "../sections/top-sale-section/container";
import PopularLocations from "../sections/locations-section/container";
import Rank from "../sections/about-us-section/container";

export default async function HomeContainer() {
  const data: HouseItemsInterface[] = await fetchHouses({
    transactionType: "",
  });
  const tehranHouses = data.filter((e) => e.address?.includes("تهران")).length;
  const shirazHouses = data.filter((e) => e.address?.includes("شیراز")).length;
  const esfahanHouses = data.filter((e) =>
    e.address?.includes("اصفهان")
  ).length;
  const houseLength = data.length;
  return (
    <Container>
      <div className="flex flex-col flex-wrap gap-[118px] w-[85.5%]">
        <HeroSection />
        <div className="animate-[var(--animation-content-pop)] [animation-timeline:scroll(root)] [animation-range:200px_600px] flex flex-col flex-wrap gap-[120px]">
          <Offers data={data} />
          <Category />
          <TopSales data={data} />
          <Rank />
          <PopularLocations
            tehranHouses={tehranHouses}
            shirazHouses={shirazHouses}
            esfahanHouses={esfahanHouses}
          />
          <PropertyAgentSection houses={data} houseLength={houseLength} />
          {/* <Comments /> */}
        </div>
      </div>
    </Container>
  );
}
