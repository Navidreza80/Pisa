import TableDashboard from "@/components/common/dashboard/Table";
import formatToPersianDate from "@/utils/helper/format-date";
import fetchDocuments from "@/utils/service/documents/get";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

const tableHeaderItems = [
  { text: "عنوان خانه", clx: "rounded-r-xl" },
  { text: "نوع سند", clx: null },
  { text: "دانلود سند", clx: null },
  { text: "امضا شده", clx: null },
  { text: "مشاهده امضا", clx: null },
  { text: "تاریخ ایجاد", clx: "rounded-l-xl" },
];

const ViewDocuments = ({
  houseId,
  houseTitle,
}: {
  houseId: string;
  houseTitle: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const handleSetParam = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value.toString());
    router.push(`?${params.toString()}`);
  };
  const { data: documents, isLoading } = useQuery({
    queryKey: ["DOCUMENTS"],
    queryFn: () => fetchDocuments(houseId, { page: page || 1 }),
  });
  if (isLoading) return <div>درحال بارگزاری...</div>;
  if (!documents?.documents) return <div>موردی یافت نشد.</div>;
  return (
    <TableDashboard
      currentPage={Number(page) || 1}
      totalCount={documents?.documents.totalCount}
      pageSize={5}
      onPageChange={(page) => handleSetParam("page", page.toString())}
      headerCLX="text-center"
      tableHeader={tableHeaderItems}
      tableContent={documents?.documents.map((document) => (
        // Table content
        <tr
          key={document.id}
          className="bg-table-main/30 rounded-xl text-xl text-center"
        >
          <td className="pl-6 rounded-r-xl">{houseTitle}</td>
          <td className="pl-6 py-7">{document.documentType}</td>
          <td className="pl-6 py-7">
            <a
              href={document.filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              دانلود
            </a>
          </td>
          <td>{document.signed ? "بله" : "خیر"}</td>
          <td>
            {document.signature ? (
              <a
                href={document.signature}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                دانلود
              </a>
            ) : (
              "-"
            )}
          </td>
          <td className="rounded-l-xl">{formatToPersianDate(document.createdAt)}</td>
        </tr>
      ))}
    />
  );
};
export default ViewDocuments;
