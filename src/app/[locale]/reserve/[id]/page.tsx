import Container from "@/components/common/container";
import Footer from "@/components/common/footer/footer";
import Header from "@/components/common/header/header";
import BookingProcessContainer from "@/components/pages/booking-process/container";

const Page = async () => {
  return (
    <>
      <Header />
      <Container>
        <BookingProcessContainer />
      </Container>
      <Footer />
    </>
  );
};
export default Page;
