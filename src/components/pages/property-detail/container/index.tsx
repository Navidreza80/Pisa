import Container from "@/components/common/container";
import type { HouseItemsInterface } from "@/types/house";
import { fetchHouses } from "@/utils/service/house/get";
import { getHouseById } from "@/utils/service/house/get-by-id";
import Image from "next/image";
import HeaderSection from "../content/HeaderSection";
import HouseRate from "../content/HouseRate";
import MainImages from "../content/MainImages";
import ParagraphSection from "../content/ParagraphSection";
import TitleSection from "../content/TitleSection";
import Facilities from "../content/Facilities";
import PropertyLocation from "../content/PropertyLocation";
import ReserveForm from "../content/forms/ReservePropertyForm";
import RentForm from "../content/forms/RentPropertyForm";
import AllComments from "../content/AllComments";
import RelatedHouse from "../content/RelatedHouse";
import PropertyQA from "../content/PropertyQA";

/**
 * Single property page - Displaying detail of property
 *
 * @page
 * @route /property-detail/[id]
 *
 * Features:
 * - Displaying related house
 * - Displaying house location in map
 * - Comment section
 *
 */

export default async function PropertyDetailContainer({ id }: { id: string }) {
  // Fetching property details server side
  let propertyDetails;
  if (typeof id == "string") propertyDetails = await getHouseById(id);

  // Fetching related properties server side
  const relatedHouses: HouseItemsInterface[] = await fetchHouses({
    transactionType: propertyDetails?.transaction_type,
    limit: 3
  });

  console.log(relatedHouses)

  // Handle if the property detail is undefined
  if (!propertyDetails) {
    throw new Error("Property details is undefined");
  }

  const {
    address,
    title,
    photos,
    rate,
    categories,
    price,
    yard_type,
    capacity,
    rooms,
    bathrooms,
    parking,
    location,
    caption,
  } = propertyDetails;

  // Getting isHotel value based on transaction type
  // If its "reservation" the property is hotel
  // If the property is hotel, render some elements and don't render some elements.
  const isHotel =
    propertyDetails?.transaction_type == "direct_purchase" ? true : false;
  return (
    <Container>
      <div className="w-[85.5%] flex flex-wrap gap-y-8">
        {/* Top section */}
        <HeaderSection
          address={address ? address : ""}
          title={title ? title : ""}
        />
        {/* Mid section */}
        <div dir="rtl" className="w-full flex justify-between flex-wrap gap-8">
          {/* Main images */}
          <div className="lg:w-[47%] md:w-full w-full">
            <MainImages show3D photos={photos ? photos : []} sticky={true} />
          </div>
          {/* Left section */}
          <div className="lg:w-[50%] md:w-full w-full flex flex-col gap-5">
            {/* Title section */}
            {isHotel && (
              <TitleSection textContent={`چرا ${title} رو انتخاب کنیم؟`} />
            )}
            {/* Description section */}
            <ParagraphSection
              textContent={caption ? caption : "این ملک توضیحاتی ندارد"}
            />
            {isHotel && (
              <>
                {/* Image section */}
                {photos && (
                  <Image
                    width={500}
                    height={500}
                    alt={title || "houseImage"}
                    src={photos[1]}
                    className="h-[253px] w-full rounded-3xl"
                    unoptimized
                  />
                )}
              </>
            )}
            {/* Rate section */}
            <HouseRate rate={rate} />

            {/* Facilities section */}
            <Facilities
              propertyType={categories.name}
              yard_type={yard_type}
              capacity={capacity}
              rooms={rooms}
              bathrooms={bathrooms}
              parking={parking}
              isHotel={isHotel}
            />
            {/* Map section */}
            {!isHotel && location.lat && location.lat && (
              <>
                <div className="h-[349px] rounded-4xl">
                  <PropertyLocation
                    photoUrl={photos[0]}
                    propertyLocation={[location.lat, location.lng]}
                  />
                </div>
              </>
            )}

            {/* Reserve section */}
            {isHotel ? <ReserveForm price={price} /> : <RentForm />}
            {/* Comments section */}
            <AllComments houseId={id} />
            {/* QA Section */}
            <PropertyQA houseId={id} />
          </div>
        </div>
        {/* Bottom section */}
        <RelatedHouse
          relatedHouses={relatedHouses.filter(
            (e) => e.id != id
          )}
        />
      </div>
    </Container>
  );
}
