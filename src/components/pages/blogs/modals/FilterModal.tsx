"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default function FilterModal({ filters, onChange, onReset }: FilterModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-12 px-4 rounded-[16px] bg-white border-[1.5px] border-[#EAEAEA] text-[#272727] hover:bg-[#f5f5f5] flex gap-2 items-center text-[16px]"
          variant="outline"
        >
          <SlidersHorizontal size={18} />
          فیلتر
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[420px] rounded-2xl bg-[var(--color-surface)] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[var(--color-text)]">فیلترها</h2>
          <button onClick={() => setOpen(false)}>
            <X className="text-[var(--color-text-secondary)]" />
          </button>
        </div>

        <div className="space-y-4">
          <input
            className="w-full border border-[var(--color-border)] rounded-xl p-3 text-sm"
            placeholder="عنوان بلاگ"
            value={filters.title || ""}
            onChange={(e) => onChange("title", e.target.value)}
          />

          <input
            className="w-full border border-[var(--color-border)] rounded-xl p-3 text-sm"
            placeholder="آیدی نویسنده (author_id)"
            type="number"
            value={filters.author_id || ""}
            onChange={(e) => onChange("author_id", parseInt(e.target.value))}
          />

          <input
            className="w-full border border-[var(--color-border)] rounded-xl p-3 text-sm"
            placeholder="آیدی دسته‌بندی (category_id)"
            type="number"
            value={filters.category_id || ""}
            onChange={(e) => onChange("category_id", parseInt(e.target.value))}
          />

          <div className="grid grid-cols-2 gap-2">
            <select
              className="border border-[var(--color-border)] rounded-xl p-3 text-sm"
              value={filters.sort}
              onChange={(e) => onChange("sort", e.target.value)}
            >
              <option value="created_at">تاریخ ایجاد</option>
              <option value="title">عنوان</option>
              <option value="author_id">نویسنده</option>
            </select>

            <select
              className="border border-[var(--color-border)] rounded-xl p-3 text-sm"
              value={filters.order}
              onChange={(e) => onChange("order", e.target.value)}
            >
              <option value="DESC">نزولی</option>
              <option value="ASC">صعودی</option>
            </select>
          </div>

          <Button
            variant="outline"
            className="w-full mt-2 border border-[var(--color-border)] text-[var(--color-primary)]"
            onClick={() => {
              onReset();
              setOpen(false);
            }}
          >
            حذف فیلترها
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
