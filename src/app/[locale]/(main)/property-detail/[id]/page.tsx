import PropertyDetailContainer from "@/components/pages/property-detail/container";
import { NextPage } from "next";

interface PageProps {
  params: {
    id: string;
  };
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = params;
  return <PropertyDetailContainer id={id} />;
};

export default Page;
