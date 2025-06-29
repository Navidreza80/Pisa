import { LabelManager } from "@/components/common/inputs/label-handler";
import InputSelect from "@/components/common/inputs/select-input";
import InputText from "@/components/common/inputs/text-input-with-label";
import { Fragment } from "react";

export default function AddPropertyStepThree({ formik, setYard_type, tags, setTags }) {
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
      onChange: (e) => setYard_type(e),
      items: [
        { value: "روستایی", text: "روستایی" },
        { value: "ساحلی", text: "ساحلی" },
        { value: "شهری", text: "شهری" },
        { value: "جنگلی", text: "جنگلی" },
      ],
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
              <InputSelect
                withLabel
                items={item.items}
                label={item.text}
                className="!w-full"
              />
            </Fragment>
          );
        })}
      </div>
      <LabelManager
        labels={tags}
        onChange={setTags}
        maxLabels={3}
        maxLength={20}
        modalTitle="اضافه کردن برچسب"
        inputTitle="برچسب ها"
        emptyState="برچسبی اضافه نشده است"
      />
    </>
  );
}
