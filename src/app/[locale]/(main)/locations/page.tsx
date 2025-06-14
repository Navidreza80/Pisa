"use server";

import Container from "@/components/common/container";
import LocationsListContainer from "@/components/pages/location-list/container";

const Page = async () => {
  return (
    <Container>
      <LocationsListContainer />
    </Container>
  );
};
export default Page;
