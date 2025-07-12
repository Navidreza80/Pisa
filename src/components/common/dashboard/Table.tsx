import { Table } from "reactstrap";
import Button from "../button";
import AddSVG from "@/components/dashboard/svg/AddSVG";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";

type TableDashboardProps = {
  tableContent: React.ReactNode;
  pageInation?: boolean;
  headerCLX?: string;
  tableHeader: { text: string | null; clx: string | null }[];
  headerSecondary?: boolean;
  add?: React.ReactNode;
  href?: string;
  addTitle?: string;
  currentPage?: number;
  totalCount?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
};

const TableDashboard = ({
  tableContent,
  pageInation = true,
  headerCLX,
  tableHeader,
  headerSecondary,
  add,
  href,
  addTitle,
  currentPage = 1,
  totalCount = 0,
  pageSize = 10,
  onPageChange,
}: TableDashboardProps) => {
  const t = useTranslations("WarningModal");
  const totalPages = Math.ceil(totalCount / pageSize);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <>
      <Table
        
        responsive
        className="w-full text-sm border-separate border-spacing-y-4"
      >
        <thead>
          <tr
            className={` ${headerSecondary ? "bg-table-header" : headerCLX ? headerCLX : "bg-table-main"} p-2 font-yekan text-text`}
          >
            {tableHeader.map((item, index) => {
              return (
                <th
                  key={index}
                  className={`p-2 text-lg  font-medium ${item.clx}`}
                >
                  {item.text}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </Table>
      {pageInation && totalPages > 1 && (
        <div
          className={`flex ${add ? "justify-between w-full" : "justify-start"} mt-[71px] items-center`}
        >
          <div className="flex justify-start gap-2">
            {pageNumbers.map((p) => (
              <button
                key={p}
                className={`w-8 h-8 cursor-pointer rounded-full border text-sm transition-colors ${
                  p === currentPage ? "bg-primary text-white" : "bg-background"
                }`}
                onClick={() => onPageChange?.(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
      {add && (
        <Link href={href}>
          <Button className="gap-1.5 !w-auto">
            <AddSVG /> {t("add")} {addTitle}
          </Button>
        </Link>
      )}
    </>
  );
};
export default TableDashboard;
