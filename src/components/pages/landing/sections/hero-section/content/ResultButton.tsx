"use client";
// Third party components
import Button from "@/components/common/button";
import HouseCard from "@/components/common/house/house-card";
import { HouseItemsInterface } from "@/types/house";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
// Import shadcn dialog and input
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function ResultButton({
  houses,
}: {
  houses: Array<HouseItemsInterface>;
}) {
  // Hooks
  const t = useTranslations("HomePage");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  // Filter houses based on search query
  const filteredHouses = houses?.filter((house) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (house.title && house.title.toLowerCase().includes(searchLower)) ||
      (house.address && house.address.toLowerCase().includes(searchLower)) ||
      (house.tags &&
        house.tags.some((tag) => tag.toLowerCase().includes(searchLower)))
    );
  });

  return (
    <>
      <Button
        handleClick={showModal}
        className="transition-colors duration-300 ease-in-out animate-[var(--animation-pulse)] [animation-delay:1.3s] [animation-iteration-count:1] [animation-fill-mode:both]"
      >
        {t("result")}
      </Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[700px] h-[100%] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle className=" w-full">
              {t("searchResults")}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 " >
            <div className="mb-4 relative">
              <Input
                placeholder={t("searchInResults")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-lg pr-10 border-border"
              />
              <Search
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
            {filteredHouses && filteredHouses.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredHouses.map((item, index) => (
                  <HouseCard key={index} item={item} />
                ))}
              </div>
            ) : (
              <p className="text-center text-text-secondary">
                {searchQuery
                  ? t("noResultsFoundDepend")
                  : t("noResultsFound")}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
