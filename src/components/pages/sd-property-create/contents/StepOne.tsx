import InputSelect from "@/components/common/inputs/select-input";
import InputText from "@/components/common/inputs/text-input-with-label";
import { ArrowLeftSVG } from "@/components/svg";
import { Fragment } from "react";

export default function AddPropertyStepOne({
  formik,
  setProperty_type,
  setYard_type,
  setTransaction_type,
}) {
  const inputs = [
    {
      text: "ظرفیت(نفر):",
      placeHolder: null,
      isSelect: false,
      name: "capacity",
      value: formik.values.capacity,
    },
    {
      text: "نام ملک:",
      placeHolder: "آپارتمان لوتوس 102 در ساری ",
      isSelect: false,
      name: "title",
      value: formik.values.title,
    },
    {
      text: "قیمت:",
      placeHolder: "ریال",
      isSelect: false,
      name: "price",
      value: formik.values.price,
    },
    {
      text: "نوع معامله:",
      placeHolder: null,
      isSelect: true,
      items: [
        { value: "reservation", text: "رزرو" },
        { value: "mortgage", text: "رهن" },
        { value: "rental", text: "اجاره" },
        { value: "direct_purchase", text: "پرداخت مسقیم" },
      ],
      onChange: (e) => setTransaction_type(e),
    },
    {
      text: "زیرنوع ملک:",
      placeHolder: null,
      isSelect: true,
      items: [
        { value: "روستایی", text: "روستایی" },
        { value: "ساحلی", text: "ساحلی" },
        { value: "شهری", text: "شهری" },
        { value: "جنگلی", text: "جنگلی" },
      ],
      onChange: (e) => setYard_type(e),
    },
    {
      text: "نوع ملک:",
      placeHolder: null,
      isSelect: true,
      items: [
        { value: "apartment", text: "آپارتمان" },
        { value: "villa", text: "ویلا" },
        { value: "commercial", text: "تجاری" },
        { value: "land", text: "زمین" },
      ],
      onChange: (e) => setProperty_type(e),
    },
  ];

  return (
    <>
      <div className="mt-5 md:mt-[33px] grid w-full grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-4 md:gap-x-[63px] gap-y-[19px] relative">
        {inputs.map((item, index) => {
          return !item.isSelect ? (
            <InputText
              name={item.name}
              onChange={formik.handleChange}
              key={index}
              placeHolder={item.placeHolder}
              label={item.text}
            />
          ) : (
            <Fragment key={index}>
              {index == 4 && (
                <ArrowLeftSVG className="absolute left-[calc(50%-11px)] top-36 hidden md:hidden lg:block" />
              )}
              <InputSelect
                items={item.items}
                onChange={item.onChange}
                withLabel
                label={item.text}
                className="!w-full"
              />
            </Fragment>
          );
        })}
      </div>
      <InputText
        name="caption"
        onChange={formik.handleChange}
        className="w-full mt-[19px]"
        height="h-[150px] md:h-[215px]"
        label="توضیحات  ملک:"
      />
    </>
  );
}
