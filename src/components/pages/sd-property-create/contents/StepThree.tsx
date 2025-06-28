import InputSelect from "@/components/common/inputs/select-input";
import InputText from "@/components/common/inputs/text-input-with-label";
import { ArrowLeftSVG } from "@/components/svg";
import { Fragment } from "react";

export default function AddPropertyStepThree({ formik }) {
  const inputs = [
    {
      text: "تعداد اتاق:",
      placeHolder: null,
      isSelect: false,
      name: "rooms",
      value: formik.values.rooms,
    },
    {
      text: "تعداد حمام:",
      placeHolder: null,
      isSelect: false,
      name: "bathrooms",
      value: formik.values.bathrooms,
    },

    {
      text: "تعداد پارکینگ:",
      placeHolder: null,
      isSelect: false,
      name: "parking",
      value: formik.values.parking,
    },
    {
      text: "نوع حیاط:",
      placeHolder: null,
      isSelect: true,
      name: "yard_type",
      value: formik.values.yard_type,
    },
  ];
  return (
    <>
      <div className="mt-[33px] grid w-full lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-x-[63px] gap-y-[19px] relative">
        {inputs.map((item, index) => {
          return !item.isSelect ? (
            <InputText
              name={item.name}
              value={item.value}
              onChange={formik.handleChange}
              key={index}
              placeHolder={item.placeHolder}
              label={item.text}
            />
          ) : (
            <Fragment key={index}>
              {index == 4 && (
                <ArrowLeftSVG className="absolute left-[calc(50%-11px)] top-36" />
              )}
              <InputSelect withLabel label={item.text} className="!w-full" />
            </Fragment>
          );
        })}
      </div>
      <InputSelect className="!w-full mt-[19px]" withLabel label="برچسب  ها:" />
    </>
  );
}
