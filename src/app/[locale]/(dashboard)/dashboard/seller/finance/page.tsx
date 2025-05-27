"use client";
import InputSelect from "@/components/common/inputs/select-input";
import Line from "@/components/dashboard/buyer/line";
import TableDashboard from "@/components/dashboard/table";

const properties = [
  {
    id: 1,
    date: "12 مرداد - 1401 / 12:33",
    number: "123456789123456",
    price: "1250000",
    transaction: "شارژ کیف پول",
    status: "فعال",
  },
  {
    id: 2,
    date: "12 مرداد - 1401 / 12:33",
    number: "123456789123456",
    price: "1250000",
    transaction: "شارژ کیف پول",
    status: "فعال",
  },
  {
    id: 3,
    date: "12 مرداد - 1401 / 12:33",
    number: "123456789123456",
    price: "1250000",
    transaction: "شارژ کیف پول",
    status: "فعال",
  },
  {
    id: 4,
    date: "12 مرداد - 1401 / 12:33",
    number: "123456789123456",
    price: "1250000",
    transaction: "شارژ کیف پول",
    status: "فعال",
  },
  {
    id: 5,
    date: "12 مرداد - 1401 / 12:33",
    number: "123456789123456",
    price: "1250000",
    transaction: "شارژ کیف پول",
    status: "فعال",
  },
];

const statusColor = {
  فعال: "bg-green-400 text-white",
  "در انتظار": "bg-yellow-400 text-black",
  غیرفعال: "bg-red-400 text-white",
};

export const tableHeaderItems = [
  { text: "تاریخ", clx: "rounded-r-xl" },
  { text: "شماره پیگیری", clx: null },
  { text: "مبلغ", clx: null },
  { text: "وضعیت پرداخت", clx: null },
  { text: "نوع تراکنش", clx: null },
  { text: "", clx: "rounded-l-xl" },
];

export default function FinanceManagement() {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
        <h1 className="text-xl font-medium my-auto order-1 md:order-2 flex gap-1">
          <p className="text-text-secondary">(25)</p>
          لیست تراکنش های مشتریان
        </h1>
        <div className="flex flex-col md:flex-row lg:flex-row items-start md:items-center gap-4 md:gap-[19px] w-full md:w-auto order-2 md:order-1">
          <InputSelect withLabel label="نوع تراکنش :" />
          <InputSelect withLabel label="وضعیت پرداخت :" />
        </div>
      </div>
      <Line />

      <TableDashboard
        addTitle="ملک"
        tableHeader={tableHeaderItems}
        tableContent={properties.map((property) => (
          <tr key={property.id} className="rounded-xl">
            <td className="pl-6 py-7 rounded-r-xl text-[20px] font-medium">
              {property.date}
            </td>
            <td className="px-6 py-7 text-[20px] font-medium">
              {property.number}
            </td>
            <td className="px-6 py-7 text-[20px] font-medium">
              {property.price}
            </td>
            <td className="px-6 py-7 text-[13px] font-medium">
              <span
                className={`px-3 py-1 rounded-full text-sm ${statusColor[property.status]}`}
              >
                {property.status}
              </span>
            </td>
            <td className="px-6 py-7  text-[16px] font-medium">
              {property.transaction}
            </td>
            <td className="px-6 py-2  text-[16px] font-medium relative rounded-l-xl">
              مشاهده رسید
            </td>
          </tr>
        ))}
      />
    </div>
  );
}
