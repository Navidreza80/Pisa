"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

type SaveSearchModalProps = {
  searchQuery: string;
  onSave: (note: string) => Promise<void>;
};

export default function SaveSearchModal({ searchQuery, onSave }: SaveSearchModalProps) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(note);
      setOpen(false);
      setNote("");
    } catch (error) {
      alert("Error saving your search");
    }
    setLoading(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          disabled={!searchQuery}
          className={`mr-2 px-4 py-2 rounded bg-primary text-background disabled:opacity-50`}
          aria-label="Save search"
        >
          Save
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full bg-background rounded-lg p-6 shadow-lg -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-lg font-bold mb-4">Enter description for your search</Dialog.Title>
          <textarea
            className="w-full border rounded-md p-2 mb-4"
            rows={5}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write some notes..."
          />
          <div className="flex justify-end gap-2">
            <Dialog.Close className="px-4 py-2 rounded border border-border hover:bg-border/50">Cancel</Dialog.Close>
            <button
              onClick={handleSave}
              disabled={loading || note.trim() === ""}
              className="px-4 py-2 rounded bg-primary text-background disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
