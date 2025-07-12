"use client";
import Link from "next/link";

interface IProps {
  area_name: string;
}

const LocationName: React.FC<IProps> = ({ area_name }) => {
  return (
    <Link href="/reserve">
      <p className="text-lg text-[20px] font-[600] text-text ">{area_name}</p>
    </Link>
  );
};

export default LocationName;
