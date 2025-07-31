"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useState } from "react";

type SaveSearchModalProps = {
  searchQuery: string;
  onSave: (note: string) => Promise<void>;
};

export default function SaveSearchModal({
  searchQuery,
  onSave,
}: SaveSearchModalProps) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(note);
      setOpen(false);
      setNote("");
    } catch {
      return;
    }
    setLoading(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          disabled={!searchQuery}
          className={`mr-2 px-3 py-2.5 rounded bg-primary text-background disabled:opacity-50 cursor-pointer`}
          aria-label="Save search"
        >
          <Image
            src="https://img.icons8.com/?size=100&id=84065&format=png&color=ffffff"
            className="w-5 h-5"
            alt="Image"
            width={20}
            height={20}
            unoptimized
          />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full bg-background rounded-lg p-6 shadow-lg -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-lg font-bold mb-4">
            یک یادداشت برای سرچ خود وارد کنید.
          </Dialog.Title>
          <textarea
            className="w-full border rounded-md p-2 mb-4"
            rows={5}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="یادداشت خود را وارد کنید..."
          />
          <div className="flex justify-end gap-2">
            <Dialog.Close className="px-4 py-2 rounded border border-border hover:bg-border/50">
              انصراف
            </Dialog.Close>
            <button
              onClick={handleSave}
              disabled={loading || note.trim() === ""}
              className="px-4 py-2 rounded bg-primary text-background disabled:opacity-50"
            >
              {loading ? "درحال ذخیره..." : "ذخیره"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
