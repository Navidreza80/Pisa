"use client";

import Button from "@/components/common/button";
import DivButton from "@/components/common/DivButton";
import InputSelect from "@/components/common/inputs/select-input";
import Modal from "@/components/common/modal/modal";
import { useState } from "react";

interface FilterModalProps {
  filters: {
    title?: string;
    author_id?: number;
    category_id?: number;
    sort?: string;
    order?: string;
  };
  onChange: (key: string, value: any) => void;
  onReset: () => void;
}
const sortOptions = [
  { id: 2, text: "تاریخ ایجاد", value: "created_at" },
  { id: 3, text: "عنوان", value: "title" },
  { id: 4, text: "نویسنده", value: "author_id" },
];

const orderOptions = [
  { id: 2, text: "نزولی", value: "DESC" },
  { id: 3, text: "صعودی", value: "ASC" },
];


export default function FilterModal({ filters, onChange, onReset }: FilterModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      className="!max-w-[420px]"
      trigger={<DivButton className="!w-auto px-4">فیلتر ها</DivButton>}
      open={open}
      onOpenChange={setOpen}
    >
      <div className="space-y-4">
        {/* <input
          className="w-full border border-[var(--color-border)] rounded-xl p-3 text-sm"
          placeholder="آیدی نویسنده (author_id)"
          type="number"
          value={filters.author_id ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            onChange("author_id", val === "" ? undefined : parseInt(val));
          }}
        />

        <input
          className="w-full border border-[var(--color-border)] rounded-xl p-3 text-sm"
          placeholder="آیدی دسته‌بندی (category_id)"
          type="number"
          value={filters.category_id ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            onChange("category_id", val === "" ? undefined : parseInt(val));
          }}
        /> */}
        <div className="flex justify-between gap-2">
          <InputSelect
            items={sortOptions}
            value={filters.sort || ""}
            onChange={(value) => onChange("sort", value)}
          />

          <InputSelect
            items={orderOptions}
            value={filters.order || ""}
            onChange={(value) => onChange("order", value)}
          />
        </div>


        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            className="text-white !bg-primary/90"
            onClick={() => {
              onReset();
              setOpen(false);
            }}
          >
            حذف فیلترها
          </Button>
        </div>
      </div>
    </Modal>
  );
}
