"use client";
import { useAppDispatch } from "@/utils/hooks/react-redux/store/hook";
import { setReserveFilters } from "@/utils/hooks/react-redux/store/slices/reserve-slice";
import Link from "next/link";

export default function LocationName({ area_name }) {
  const dispatch = useAppDispatch();

  const handleChange = (name: string, value: any) => {
    dispatch(setReserveFilters({ [name]: value }));
  };
  return (
    <Link
      href="/reserve"
      onClick={() => {
        handleChange("sort", "price");
        handleChange("search", area_name.slice(0,5));
      }}
    >
      <p className="text-lg text-[20px] font-[600] text-text ">{area_name}</p>
    </Link>
  );
}
