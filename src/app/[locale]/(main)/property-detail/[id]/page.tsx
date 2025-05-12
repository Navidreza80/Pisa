// Next
import Image from "next/image";

// API & data fetching
import { fetchHouses } from "@/utils/service/house/get";
import { getHouseById } from "@/utils/service/house/get-by-id";

// Types
import type { HouseItemsInterface } from "@/types/house";

// Third party components
import Container from "@/components/common/container";
import PropertyLocation from "@/components/common/house/property-location";
import AllComments from "@/components/single-house/all-comments";
import Facilities from "@/components/single-house/facilities";
import HeaderSection from "@/components/single-house/header-section";
import MainImages from "@/components/single-house/main-images";
import ParagraphSection from "@/components/single-house/paragraph-section";
import RelatedHouse from "@/components/single-house/related-houses";
import RentForm from "@/components/single-house/rent-form";
import ReserveForm from "@/components/single-house/reserve-property-form";
import SendComment from "@/components/single-house/send-comment-form";
import TitleSection from "@/components/single-house/title-section";

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
    search: propertyDetails.address,
  });

  // Getting isHotel value based on transaction type
  // If its "reservation" the property is hotel
  // If the property is hotel, render some elements and don't render some elements.
  const isHotel =
    propertyDetails.transaction_type == "direct_purchase" ? true : false;
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
          <div className="w-[47%]"><MainImages
            photos={propertyDetails.photos ? propertyDetails.photos : []}
          /></div>
          {/* Left section */}
          <div className="lg:w-[50%] md:w-full w-full flex flex-col gap-5">
            {/* Title section */}
            {isHotel && (
              <TitleSection textContent="چرا هتل همایون رو انتخاب کنیم؟" />
            )}
            {/* Description section */}
            <ParagraphSection textContent="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد." />
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
                <TitleSection textContent="چرا هتل همایون رو انتخاب کنیم؟" />
                {/* Description 2 section */}
                <ParagraphSection textContent="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد." />
              </>
            )}
            {/* Facilities section */}
            <Facilities
              propertyType={propertyDetails.categories.name}
              yard_type={propertyDetails.yard_type}
              capacity={propertyDetails.capacity}
              rooms={propertyDetails.rooms}
              bathrooms={propertyDetails.bathrooms}
              parking={propertyDetails.parking}
              isHotel={isHotel}
            />
            {/* Map section */}
            {!isHotel && (
              <>
                <div className="h-[349px] rounded-4xl">
                  <PropertyLocation
                    propertyLocation={[
                      propertyDetails.location.lat,
                      propertyDetails.location.lng,
                    ]}
                  />
                </div>
                <ParagraphSection textContent="این هتل خیلی خیلیلخیلخیل خقن ختما بهزین دااداش اصلا بی نظیرع" />
              </>
            )}

            {/* Reserve section */}
            {isHotel ? <ReserveForm /> : <RentForm />}
            {/* Comments section */}
            <AllComments houseId={id} />
          </div>
        </div>
        {/* Bottom section */}
        <RelatedHouse relatedHouses={relatedHouses} />
      </div>
    </Container>
  );
}
