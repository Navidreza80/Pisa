"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface LabelManagerProps {
  labels: string[];
  onChange: (labels: string[]) => void;
  maxLabels?: number | null;
  maxLength?: number;
  placeholder?: string;
  modalTitle?: string;
  inputTitle?: string;
  emptyState?: string;
}

export function LabelManager({
  modalTitle,
  inputTitle,
  emptyState,
  labels,
  onChange,
  maxLabels = 10,
  maxLength = 30,
  placeholder = "Enter label text",
}: LabelManagerProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && labels.length < maxLabels) {
      onChange([...labels, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleDeleteLabel = (index: number) => {
    onChange(labels.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full space-y-3">
      {/* Labels container with subtle background */}
      <div className="flex flex-wrap flex-row-reverse items-center gap-2 w-full min-h-16 p-3 bg-muted/30 rounded-2xl border border-border mt-4">
        {labels.length === 0 && (
          <p className="text-muted-foreground text-sm flex items-center h-full text-text-secondary">
            {emptyState ? emptyState : "ایتمی اضافه نشده است"}
          </p>
        )}
        {labels.map((label, index) => (
          <div
            key={index}
            className="flex items-center max-w-full bg-surface border border-primary rounded-full pl-3 pr-2 py-1 text-sm shadow-sm hover:shadow transition-shadow"
          >
            <span className="truncate max-w-[160px]">{label}</span>
            <button
              onClick={() => handleDeleteLabel(index)}
              className="ml-1 rounded-full cursor-pointer hover:bg-accent p-1 flex-shrink-0"
              aria-label={`Remove ${label}`}
            >
              <X className="h-3.5 w-3.5 text-red-500" />
            </button>
          </div>
        ))}

        {/* Add button - only shows if under max labels */}
        {labels.length < maxLabels && (
          <Dialog>
            <DialogTrigger asChild>
              <button
                className="flex items-center justify-center w-8 h-8 text-white rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                aria-label="Add label"
              >
                <Plus className="h-4 w-4 cursor-pointer" />
              </button>
            </DialogTrigger>
            <DialogContent  className="sm:max-w-[425px] bg-background">
              <DialogHeader className="mb-4">
                <DialogTitle className="">{modalTitle}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="label-text"
                    className="w-full flex flex-row-reverse"
                    
                  >
                    {inputTitle}
                  </Label>
                  <Input
                    className="border-border focus:outline-0"
                    id="label-text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={placeholder}
                    autoFocus
                    maxLength={maxLength}
                  />
                  <div className="flex justify-between text-xs my-3 text-muted-foreground">
                    <span className="text-text-secondary">
                      {labels.length}/{maxLabels} ایتم استفاده شده
                    </span>
                    <span className="text-text-secondary">
                      {inputValue.length}/{maxLength} کاراکتر
                    </span>
                  </div>
                </div>
                <div className="flex justify-end gap-2 flex-row-reverse">
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-border"
                    >
                      لغو
                    </Button>
                  </DialogTrigger>
                  <Button
                    type="submit"
                    className="text-white"
                    disabled={!inputValue.trim()}
                  >
                    تایید
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
