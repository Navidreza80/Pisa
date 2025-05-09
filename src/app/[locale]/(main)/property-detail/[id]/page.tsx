// Next
import Image from "next/image";

// API & data fetching
import { fetchHouses } from "@/utils/service/house/get";
import { getHouseById } from "@/utils/service/house/get-by-id";
import { getAllPropertyComments } from "@/utils/service/comments/get";

// Types
import type { HouseItemsInterface } from "@/types/house";
import type { Comments } from "@/types/comments";

// Third party components
import Container from "@/components/common/container/container";
import AllComments from "@/components/single-house/all-comments";
import Facilities from "@/components/single-house/facilities";
import HeaderSection from "@/components/single-house/header-section";
import MainImages from "@/components/single-house/main-images";
import ParagraphSection from "@/components/single-house/paragraph-section";
import RelatedHouse from "@/components/single-house/related-houses";
import ReserveForm from "@/components/single-house/reserve-property-form";
import SendComment from "@/components/single-house/send-comment-form";
import TitleSection from "@/components/single-house/title-section";
import RentForm from "@/components/single-house/rent-form";
import PropertyLocation from "@/components/common/house/property-location";




export default async function HouseDetail({
  params: { id },
}: {
  params: { id: number };
}) {
  // Fetching property details server side
  const propertyDetails = await getHouseById(id);

  // Fetching related properties server side
  const relatedHouses: HouseItemsInterface[] = await fetchHouses({
    transactionType: "",
  });

  // Fetching property comments server side
  const propertyComments: Comments[] = await getAllPropertyComments(id)

  // Getting isHotel value based on transaction type
  // If its "reservation" the property is hotel
  // If the property is hotel, render some elements and don't render some elements.
  const isHotel = propertyDetails.transaction_type == "reservation" ? true : false;
  return (
    <Container>
      <div className="w-[85.5%] flex flex-wrap gap-y-8">
        {/* Top section */}
        <HeaderSection
          address={propertyDetails.address ? propertyDetails.address : ""}
          title={propertyDetails.title ? propertyDetails.title : ""}
        />
        {/* Mid section */}
        <div dir="rtl" className="w-full flex justify-between flex-wrap gap-8">
          {/* Main images */}
          <MainImages photos={propertyDetails.photos ? propertyDetails.photos : []} />
          {/* Left section */}
          <div className="lg:w-[50%] md:w-full w-full flex flex-col gap-5">
            {/* Title section */}
            {isHotel && (
              <TitleSection textContent="بهترین هتل جهان را چرا باید انتخاب کنیم؟" />
            )}
            {/* Description section */}
            <ParagraphSection textContent="این هتل خیلی خیلیلخیلخیل خقن ختما بهزین دااداش اصلا بی نظیرع" />
            {/* Title 2 section */}
            {isHotel && (
              <>
                {/* Image section */}
                {propertyDetails.photos && (
                  <Image
                    width={500}
                    height={500}
                    alt={propertyDetails.title || "houseImage"}
                    src={propertyDetails.photos[1]}
                    className="h-[253px] w-full rounded-3xl"
                    unoptimized
                  />
                )}
                <TitleSection textContent="داداش ناموسا رزرو کن" />
                {/* Description 2 section */}
                <ParagraphSection textContent="این هتل خیلی خیلیلخیلخیل خقن ختما بهزین دااداش اصلا بی نظیرع" />
              </>
            )}
            {/* Facilities section */}
            <Facilities propertyType={propertyDetails.categories.name} yard_type={propertyDetails.yard_type} capacity={propertyDetails.capacity} rooms={propertyDetails.rooms} bathrooms={propertyDetails.bathrooms} parking={propertyDetails.parking} isHotel={isHotel} />
            {/* Map section */}
            {!isHotel && (
              <>
                <div className="h-[349px] rounded-4xl"><PropertyLocation propertyLocation={[propertyDetails.location.lat, propertyDetails.location.lng]} /></div>
                <ParagraphSection textContent="این هتل خیلی خیلیلخیلخیل خقن ختما بهزین دااداش اصلا بی نظیرع" />
              </>
            )}

            {/* Reserve section */}
            {isHotel ? <ReserveForm /> : <RentForm />}
            {/* Send comment section */}
            <SendComment />
            {/* Comments section */}
            <AllComments propertyComments={propertyComments} />
          </div>
        </div>
        {/* Bottom section */}
        <RelatedHouse relatedHouses={relatedHouses} />
      </div>
    </Container>
  );
}
