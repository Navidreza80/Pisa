"use client";
// Next
import Link from "next/link";
import Image from "next/image";

// Images
import aparteman from "@/assets/images/landing/category/aparteman.png";
import estakhr from "@/assets/images/landing/category/estakhr.png";
import kolbe from "@/assets/images/landing/category/kolbei.png";
import Villa from "@/assets/images/landing/category/vilaii.png";

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

const CategoryImage = ({ name }: { name: string }) => {
  // Filter the reservation house items while click on the category name
  const dispatch = useAppDispatch();

  const handleChange = (name: string, value: string) => {
    dispatch(setReserveFilters({ [name]: value }));
  };
  return (
    <Link href="/reserve" onClick={() => {handleChange("propertyType", name)}}>
      <Image
        src={
          name == "ویلا"
            ? Villa.src
            : name == "مسکونی"
              ? estakhr.src
              : name == "آپارتمان"
                ? aparteman.src
                : kolbe.src
        }
        alt={name}
        width={1000}
        height={1000}
        className="w-full h-full relative z-20 rounded-[20px] object-cover opacity-75
                transition-all duration-500 ease-in-out 
                group-hover:opacity-60 group-hover:scale-110"
      />
    </Link>
  );
};
export default CategoryImage;
