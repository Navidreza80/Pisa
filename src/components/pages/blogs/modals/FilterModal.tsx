/* eslint-disable */

"use client";

import Button from "@/components/common/button";
import DivButton from "@/components/common/DivButton";
import InputSelect from "@/components/common/inputs/select-input";
import Modal from "@/components/common/modal/modal";
import { useTranslations } from "next-intl";

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

export default function FilterModal({
  filters,
  onChange,
  onReset,
}: FilterModalProps) {
  const t = useTranslations("Blog");

  const sortOptions = [
    { id: 2, text: t("newest"), value: "created_at" },
    { id: 3, text: t("title"), value: "title" },
    { id: 4, text: t("author"), value: "author_id" },
  ];

  const orderOptions = [
    { id: 2, text: t("oldest"), value: "DESC" },
    { id: 3, text: t("newest"), value: "ASC" }, 
  ];

  const handleReset = () => {
    onReset();
  };

  return (
    <Modal
      className="!max-w-[420px]"
      trigger={
        <DivButton className="!w-auto px-4">
          {t("filters") || "فیلتر ها"}
        </DivButton>
      }
      open={false}
      onOpenChange={() => {}}
    >
      <div className="space-y-4">
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
              handleReset();
            }}
          >
            {t("resetFilters") || "حذف فیلترها"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
