import { Table } from "reactstrap";
import Button from "../button";
import AddSVG from "@/components/dashboard/svg/AddSVG";
import Link from "next/link";
import { useTranslations } from "next-intl";

const TableDashboard = ({
  tableContent,
  pageInation = true,
  headerCLX,
  tableHeader,
  headerSecondary,
  add,
  href,
  addTitle,
}) => {
  const t = useTranslations("WarningModal");
  return (
    <>
      <Table
        dir="rtl"
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
      {pageInation && (
        <div
          className={`flex ${add ? "justify-between w-full" : "justify-start"} mt-[71px] items-center`}
        >
          <div className="flex justify-start gap-2">
            {[1, 2, 3, 4, 5].map((p) => (
              <button
                key={p}
                className={`w-8 h-8 rounded-full border text-sm ${p === 1 ? "bg-primary text-white" : "bg-background"}`}
              >
                {p}
              </button>
            ))}
          </div>
          {add && (
            <Link href={href}>
              <Button className="gap-1.5 !w-full">
                <AddSVG /> {t("add")} {addTitle}
              </Button>
            </Link>
          )}
        </div>
      )}
    </>
  );
};
export default TableDashboard;
