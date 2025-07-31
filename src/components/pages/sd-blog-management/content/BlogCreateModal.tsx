"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import usePostBlog from "@/utils/service/blogs/Post";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { getClientCookie } from "@/utils/service/storage/client-cookie";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ModalCreateBlog({ open, onClose, onSuccess }: Props) {
  const userId = getClientCookie("userId");
  const [form, setForm] = useState({
    title: "",
    caption: "",
    estimated_reading_time: "",
    author_id: userId,
    category_id: "1",
  });

  const { mutate, isPending } = usePostBlog(() => {
    onClose();
    onSuccess?.();
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-white">
            ایجاد بلاگ جدید
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-gray-700 dark:text-gray-300"
              >
                عنوان بلاگ
              </Label>
              <Input
                id="title"
                placeholder="عنوان جذاب و توصیفی وارد کنید"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="border-border"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="caption"
                className="text-gray-700 dark:text-gray-300"
              >
                توضیحات
              </Label>
              <textarea
                id="caption"
                placeholder="توضیحات جذاب درباره بلاگ"
                value={form.caption}
                onChange={(e) => setForm({ ...form, caption: e.target.value })}
                rows={3}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px] border-border"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="readingTime"
                  className="text-gray-700 dark:text-gray-300"
                >
                  زمان مطالعه (دقیقه)
                </Label>
                <Input
                  id="readingTime"
                  type="number"
                  placeholder="زمان تخمینی مطالعه"
                  value={form.estimated_reading_time}
                  onChange={(e) =>
                    setForm({ ...form, estimated_reading_time: e.target.value })
                  }
                  className="border-border"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              type="button"
              className="px-6 border-gray-300 dark:border-gray-600"
            >
              انصراف
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="px-6 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  در حال ذخیره...
                </>
              ) : (
                "ایجاد بلاگ"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
