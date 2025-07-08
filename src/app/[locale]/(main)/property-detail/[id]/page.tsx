import PropertyDetailContainer from "@/components/pages/property-detail/container";

const Page = async ({ params }) => {
  const { id } = params;
  return <PropertyDetailContainer id={id} />;
};

export default Page;
