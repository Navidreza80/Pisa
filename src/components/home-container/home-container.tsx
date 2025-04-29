import { getAllHouse } from "@/utils/service/house/get-all-house";
import Rank from "./Rank/Rank";
import Category from "./category/Category";
import HeroSection from "./hero-section/hero-section";
import Popular from "./locations/locations";
import Offers from "./offers/offers";
import TopSales from "./topSale/TopSale";
import { getServerCookie } from "@/utils/service/storage/server-cookie";
import { jwtDecode } from "jwt-decode";
import Container from "../common/container/container";

export default async function HomeContainer() {
  const data = await getAllHouse(1, 3, "rate", "DESC", "", "");
  const token = await getServerCookie("serverAccessToken");
  const { id: userId } = typeof token == "string" && jwtDecode(token);
  return (
    <Container>
      <div className="flex flex-col flex-wrap gap-[20px] w-[85.5%]">
        <HeroSection />
        <div className="animate-[var(--animation-content-pop)] [animation-timeline:scroll(root)] [animation-range:200px_600px] flex flex-col flex-wrap gap-[100px]">
          <Offers userId={userId} data={data} />
          <Category />
          <TopSales userId={userId} data={data} />
          <Rank />
          <Popular />
          {/* <TestimonialsCarousel /> */}
        </div>
      </div>
    </Container>
  );
}
