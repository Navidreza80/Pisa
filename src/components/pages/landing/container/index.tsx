import Container from "@/components/common/container";
import { HouseItemsInterface } from "@/types/house";
import { fetchHouses } from "@/utils/service/house/get";
import Rank from "../sections/about-us-section/container";
import Category from "../sections/categories-section/container";
import HeroSection from "../sections/hero-section/container";
import PopularLocations from "../sections/locations-section/container";
import PropertyAgentSection from "../sections/property-agent-section/container";
import TopSales from "../sections/top-sale-section/container";

export default async function HomeContainer() {
  const {
    houses,
    totalCount,
  }: { houses: HouseItemsInterface[]; totalCount: number } = await fetchHouses({
    transactionType: "",
    limit: 3,
  });
  const tehranHouses = houses.filter((e) =>
    e.address?.includes("تهران")
  ).length;
  const shirazHouses = houses.filter((e) =>
    e.address?.includes("شیراز")
  ).length;
  const esfahanHouses = houses.filter((e) =>
    e.address?.includes("اصفهان")
  ).length;
  const houseLength = totalCount;

  return (
    <Container>
      <div className="flex flex-col flex-wrap gap-[118px] w-[85.5%]">
        <HeroSection />
        <div className="animate-[var(--animation-content-pop)] [animation-timeline:scroll(root)] [animation-range:200px_600px] flex flex-col flex-wrap gap-[120px] w-full">
          <TopSales data={houses} />
          <Category />
          <Rank />
          <PopularLocations
            tehranHouses={tehranHouses}
            shirazHouses={shirazHouses}
            esfahanHouses={esfahanHouses}
          />
          <PropertyAgentSection houses={houses} houseLength={houseLength} />
        </div>
      </div>
    </Container>
  );
}
