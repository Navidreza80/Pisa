import LocationDetailContainer from "@/components/pages/location-detail/container";
import { NextPage } from "next";

interface PageProps {
  params: {
    id: string;
  };
}

const Page: NextPage<PageProps> = ({ params }) => {
  const { id } = params;
  return <LocationDetailContainer id={id} />;
};
export default Page;
