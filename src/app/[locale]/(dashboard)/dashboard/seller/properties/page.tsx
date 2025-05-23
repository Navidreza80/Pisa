"use client";

import { Popover } from "@headlessui/react";
import { useState } from "react";
import { FaEllipsisV, FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { HiOutlinePlusCircle } from "react-icons/hi";

const properties = [
  {
    id: 1,
    name: "هتل سبلان رشت",
    price: "۸,۰۰۰,۰۰۰", 
    rating: "۴ از ۵",
    visits: 5,
    reservations: 5,
    status: "فعال",
  },
  {
    id: 2,
    name: "هتل سبلان رشت",
    price: "۸,۰۰۰,۰۰۰",
    rating: "۴ از ۵",
    visits: 5,
    reservations: 5,
    status: "در انتظار",
  },
  {
    id: 3,
    name: "هتل سبلان رشت",
    price: "۸,۰۰۰,۰۰۰",
    rating: "۴ از ۵",
    visits: 5,
    reservations: 5,
    status: "غیرفعال",
  },
];


const statusColors = {
  فعال: "bg-green-200 text-green-700 border-green-600",
  "در انتظار": "bg-yellow-200 text-yellow-700 border-yellow-600",
  غیرفعال: "bg-red-200 text-red-700 border-red-600",
};

export default function PropertiesTable() {
  const [menuOpenId, setMenuOpenId] = useState(null);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">لیست املاک من</h2>
        <button className="flex items-center gap-2 bg-lime-400 text-white px-4 py-2 rounded-lg">
          <HiOutlinePlusCircle size={20} />
          افزودن ملک
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <button className="bg-lime-400 text-white px-4 py-2 rounded-lg">فیلترها</button>
        <input
          type="text"
          placeholder="نام ملک مورد نظر..."
          className="border border-gray-300 rounded-full px-4 py-2 w-1/3 text-sm text-right"
        />
      </div>

<table className="w-full text-right border-separate border-spacing-y-2">
  <thead>
    <tr className="bg-gray-100 text-sm text-gray-700">
      <th className="p-2">وضعیت</th>
      <th className="p-2">رزروها</th>
      <th className="p-2">بازدیدها</th>
      <th className="p-2">امتیاز</th>
      <th className="p-2">قیمت</th>
      <th className="p-2">نام اقامتگاه</th>
      <th className="p-2"></th>
    </tr>
  </thead>
  <tbody>
    {properties.map((prop) => (
      <tr key={prop.id} className="bg-white rounded-lg shadow-sm">
        <td className="p-2">
          <span
            className={`px-3 py-1 text-sm border rounded-full ${statusColors[prop.status]}`}
          >
            {prop.status}
          </span>
        </td>
        <td className="p-2">{prop.reservations} بار</td>
        <td className="p-2">{prop.visits}</td>
        <td className="p-2">{prop.rating}</td>
        <td className="p-2">{prop.price} تومان</td>
        <td className="p-2">{prop.name}</td>
        <td className="p-2 relative">
          <Popover className="relative">
            <Popover.Button>
              <FaEllipsisV />
            </Popover.Button>
            <Popover.Panel className="absolute left-0 top-8 bg-white shadow-lg border rounded-lg z-10 text-sm w-32">
              <button className="flex items-center justify-between w-full p-2 hover:bg-gray-100">
                <FaCheck /> فعال کردن
              </button>
              <button className="flex items-center justify-between w-full p-2 hover:bg-gray-100">
                <FaEdit /> ویرایش
              </button>
              <button className="flex items-center justify-between w-full p-2 hover:bg-red-100 text-red-500">
                <FaTrash /> حذف
              </button>
            </Popover.Panel>
          </Popover>
        </td>
      </tr>
    ))}
  </tbody>
</table>


      <div className="flex justify-center mt-4 gap-2">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map((p) => (
            <button
              key={p}
              className={`w-8 h-8 rounded-full border text-sm ${p === 1 ? "bg-primary text-white" : "bg-background"}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
