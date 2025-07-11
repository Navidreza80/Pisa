/* eslint-disable */

"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/common/modal/modal";
import { Button } from "@/components/ui/button";
import EditSVG from "@/components/dashboard/svg/EditSVG";
import { useTranslations } from "next-intl";

interface FormData {
  title: string;
  address: string;
  price: string;
  capacity: number;
  bathrooms: number;
  parking: number;
  rooms: number;
  yard_type: string;
  caption: string;
}

interface HotelFormModalProps {
  house?: Partial<FormData>;
  onSubmit: (data: FormData) => void;
}

export default function EditHouse({ house, onSubmit }: HotelFormModalProps) {
  const t = useTranslations("SellerPropertyList");
  const [formData, setFormData] = useState<FormData>({
    title: "",
    address: "",
    price: "",
    capacity: 1,
    bathrooms: 1,
    parking: 1,
    rooms: 1,
    yard_type: "",
    caption: "",
  });

  useEffect(() => {
    if (house) {
      setFormData((prev) => ({
        ...prev,
        ...house,
      }));
    }
  }, [house]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["capacity", "bathrooms", "parking", "rooms"].includes(name)
        ? parseInt(value) || 0
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal
      trigger={
        <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded-[10px] px-1">
          <h1>{t("edit")}</h1>
          <div className="my-auto">
            <EditSVG />
          </div>
        </div>
      }
      title="ویرایش اطلاعات ملک"
      className="max-w-2xl"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-2 h-80 my-auto overflow-y-scroll"
      >
        {[
          { name: "title", label: "عنوان" },
          { name: "address", label: "آدرس" },
          { name: "price", label: "قیمت" },
          { name: "capacity", label: "ظرفیت", type: "number" },
          { name: "bathrooms", label: "تعداد سرویس", type: "number" },
          { name: "parking", label: "پارکینگ", type: "number" },
          { name: "rooms", label: "اتاق‌ها", type: "number" },
          { name: "yard_type", label: "نوع حیاط" },
        ].map(({ name, label, type = "text" }) => (
          <div key={name} className="flex flex-col">
            <label
              htmlFor={name}
              className="mb-1 font-semibold text-sm text-gray-700"
            >
              {label}
            </label>
            <input
              type={type}
              name={name}
              id={name}
              value={(formData as any)[name]}
              onChange={handleChange}
              className="p-2  border rounded-md focus:outline-none focus:ring focus:ring-primary text-sm"
            />
          </div>
        ))}

        <div className="flex flex-col">
          <label
            htmlFor="caption"
            className="mb-1 font-semibold text-sm text-gray-700"
          >
            توضیحات
          </label>
          <textarea
            name="caption"
            id="caption"
            rows={3}
            value={formData.caption}
            onChange={handleChange}
            className="p-2  border rounded-md resize-none focus:outline-none focus:ring focus:ring-primary text-sm"
          />
        </div>

        <Button type="submit" className="w-full mt-4 text-white cursor-pointer">
          ارسال اطلاعات
        </Button>
      </form>
    </Modal>
  );
}
