"use client";
import aparteman from "@/assets/images/landing/category/aparteman.png";
import estakhr from "@/assets/images/landing/category/estakhr.png";
import kolbe from "@/assets/images/landing/category/kolbei.png";
import Villa from "@/assets/images/landing/category/vilaii.png";
import { useAppDispatch } from "@/utils/hooks/react-redux/store/hook";
import { setReserveFilters } from "@/utils/hooks/react-redux/store/slices/reserve-slice";
import Link from "next/link";
const CategoryImage = ({ name }) => {
  const dispatch = useAppDispatch();

  const handleChange = (name: string, value: any) => {
    dispatch(setReserveFilters({ [name]: value }));
  };
  return (
    <Link href="/reserve" onClick={() => handleChange("propertyType", name)}>
      <img
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
        className="w-full h-full relative z-20 rounded-[20px] object-cover opacity-75
                transition-all duration-500 ease-in-out 
                group-hover:opacity-60 group-hover:scale-110"
      />
    </Link>
  );
};
export default CategoryImage;
