"use client";


import { useDeleteSavedSearch } from "@/utils/service/save-seach/useDeleteSaveSearch";
import { useGetSavedSearches } from "@/utils/service/save-seach/useGetSaveSearch";
import { XCircle } from "lucide-react";
import React from "react";

type SavedSearchListProps = {
    onSelect: (searchQuery: string) => void;
};

export default function SavedSearchList({ onSelect }: SavedSearchListProps) {
    const { data, isLoading } = useGetSavedSearches();
    const { mutate: deleteSearch } = useDeleteSavedSearch();

    if (isLoading) return <div className=" w-full  bg-background border border-border rounded-md shadow-md mt-1 p-2 text-sm text-gray-500">در حال بارگذاری...</div>;
    if (!data || data.length === 0) return <></>;

    return (
        <ul className="max-h-30 w-full overflow-y-scroll bg-background border border-border rounded-md shadow-md mt-1">
            {data.map((item) => (
                <li
                    key={item.id}
                    className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-border/50"
                >
                    <div onClick={() => onSelect(item.searchQuery)}>
                        <h1
                            className="flex-1 text-sm text-text truncate"
                        >
                            {item.searchQuery}
                        </h1>
                        <p className="text-[12px] text-text-secondary truncate">{item.note || "یادداشتی وجود ندارد."}</p>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteSearch(item.id);
                        }}
                        aria-label="حذف جستجو"
                        className="text-red-500 hover:text-red-700"
                    >
                        <XCircle size={18} />
                    </button>
                </li>
            ))}
        </ul>
    );
}
