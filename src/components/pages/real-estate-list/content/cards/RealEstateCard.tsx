import Image from "next/image";
import Link from "next/link";
import { StarRating } from "../RatingStarts";
import { FaBuilding, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { RealEstate } from "@prisma/client";

const RealEstateCard = ({ estate }: { estate: RealEstate }) => {
  return (
    <Link href={`/realestate/${estate.id}`} className="text-primary">
      <div
        key={estate.id}
        className="p-3 bg-background w-75 min-w-[350px] rounded-xl overflow-hidden transition-shadow duration-300 border border-border"
      >
        <div className="relative h-48">
          <Image
            src={estate.image}
            alt={estate.name}
            layout="fill"
            objectFit="cover"
            className="w-full h-full rounded-2xl"
          />
        </div>

        <div className="mt-5">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl font-bold text-text">
              {estate.name}
            </h2>
            <StarRating rating={estate.rate} />
          </div>

          <div className="h-[1px] w-full bg-border my-2" />

          <div className="flex justify-between text-text-secondary">
            <div className="flex items-center">
              <FaBuilding className="ml-2 text-primary" />
              <span>{estate.founder}</span>
            </div>

            <div className="flex items-center">
              <FaMapMarkerAlt className="ml-2 text-primary" />
              <span>{estate.city}</span>
            </div>

            <div className="flex items-center">
              <FaCalendarAlt className="ml-2 text-primary" />
              <span>{estate.yearOfEstablish}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default RealEstateCard;
