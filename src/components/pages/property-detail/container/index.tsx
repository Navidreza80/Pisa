import Container from "@/components/common/container";
import type { HouseItemsInterface } from "@/types/house";
import { fetchHouses } from "@/utils/service/house/get";
import { getHouseById } from "@/utils/service/house/get-by-id";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import AllComments from "../content/AllComments";
import Facilities from "../content/Facilities";
import HeaderSection from "../content/HeaderSection";
import HouseRate from "../content/HouseRate";
import MainImages from "../content/MainImages";
import ParagraphSection from "../content/ParagraphSection";
import PropertyLocation from "../content/PropertyLocation";
import PropertyQA from "../content/PropertyQA";
import RelatedHouse from "../content/RelatedHouse";
import TitleSection from "../content/TitleSection";
import RentForm from "../content/forms/RentPropertyForm";
import ReserveForm from "../content/forms/ReservePropertyForm";
import NoImage from "@/assets/images/no.jpg";

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
  const t = await getTranslations("SingleHouse");
  // Fetching property details server side
  let propertyDetails;
  if (typeof id == "string") propertyDetails = await getHouseById(id);
  console.log(propertyDetails);

  // Fetching related properties server side
  const { houses }: { houses: HouseItemsInterface[] } = await fetchHouses({
    transactionType: propertyDetails?.transaction_type,
    limit: 3,
  });

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
    sellerName,
    createdAt,
  } = propertyDetails;

  // Getting isHotel value based on transaction type
  // If its "reservation" the property is hotel
  // If the property is hotel, render some elements and don't render some elements.
  const isHotel =
    propertyDetails?.transaction_type == "reservation" ? true : false;
  return (
    <Container>
      <div className="w-[85.5%] flex flex-wrap gap-y-8">
        {/* Top section */}
        <HeaderSection
          address={address ? address : ""}
          title={title ? title : ""}
        />
        {/* Mid section */}
        <div className="w-full flex justify-between flex-wrap gap-8">
          {/* Main images */}
          <div className="lg:w-[47%] md:w-full w-full">
            <MainImages photos={photos ? photos : []} sticky={true} />
          </div>
          {/* Left section */}
          <div className="lg:w-[50%] md:w-full w-full flex flex-col gap-5">
            {/* Title section */}
            {isHotel && <TitleSection textContent={`${title}`} />}
            {/* Description section */}
            <ParagraphSection
              textContent={caption ? caption : t("noDescription")}
            />
            {isHotel && (
              <>
                {/* Image section */}
                {
                  <Image
                    width={500}
                    height={500}
                    alt={title || "houseImage"}
                    src={photos !== null && photos[1] || NoImage}
                    className="h-[253px] w-full rounded-3xl"
                    unoptimized
                  />
                }
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
            {!isHotel && location && location.lat && location.lat && (
              <>
                <div className="h-[349px] rounded-4xl">
                  <PropertyLocation
                    photoUrl={photos !== null ? photos[0] : NoImage}
                    propertyLocation={[31, location.lng]}
                  />
                </div>
              </>
            )}

            {/* Reserve section */}
            {isHotel ? (
              <ReserveForm price={price} />
            ) : (
              <RentForm
                houseId={id}
                sellerName={sellerName}
                date={createdAt}
                price={Number(price)}
              />
            )}
            {/* Comments section */}
            <AllComments houseId={id} />
            {/* QA Section */}
            <PropertyQA houseId={id} />
          </div>
        </div>
        {/* Bottom section */}
        <RelatedHouse
          relatedHouses={houses.filter((e) => e.id != Number(id))}
        />
      </div>
    </Container>
  );
}
