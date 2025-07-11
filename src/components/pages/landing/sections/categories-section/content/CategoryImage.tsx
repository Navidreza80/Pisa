"use client";
// Next
import Link from "next/link";
import Image from "next/image";

// Images
import aparteman from "@/assets/images/landing/category/aparteman.png";
import estakhr from "@/assets/images/landing/category/estakhr.png";
import kolbe from "@/assets/images/landing/category/kolbei.png";
import Villa from "@/assets/images/landing/category/vilaii.png";
import jungle from "@/assets/images/jungle-house.jpg";
import NoImage from "@/assets/images/no.jpg";
import beach from "@/assets/images/beach-house.jpg";

// Hooks
import { useAppDispatch } from "@/utils/hooks/react-redux/store/hook";
import { setReserveFilters } from "@/utils/hooks/react-redux/store/slices/reserve-slice";

/**
 * Reusable categories image component.
 *
 * @component
 * @param {name} props - Component props
 * @returns {JSX.Element} - Rendered category image
 */

const CategoryImage = ({ name, id }: { name: string; id: string }) => {
  // Filter the reservation house items while click on the category name
  const dispatch = useAppDispatch();

  const handleChange = (name: string, value: string) => {
    dispatch(setReserveFilters({ [name]: value }));
  };
  return (
    <Link
      href="/reserve"
      className="relative"
      onClick={() => {
        handleChange("propertyType", name);
      }}
    >
      <Image
        src={
          id == "1"
            ? aparteman.src
            : id == "2"
              ? kolbe.src
              : id == "3"
                ? estakhr.src
                : id == "4"
                  ? Villa.src
                  : id == "5"
                    ? jungle.src
                    : id == "6"
                      ? beach.src
                      : NoImage.src
        }
        alt={name}
        width={1000}
        height={1000}
        className="w-full md:h-full h-[200px] relative z-20 rounded-4xl object-cover opacity-85
                transition-all duration-500 ease-in-out 
                group-hover:opacity-60 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 rounded-4xl z-30 to-transparent"></div>
    </Link>
  );
};
export default CategoryImage;
