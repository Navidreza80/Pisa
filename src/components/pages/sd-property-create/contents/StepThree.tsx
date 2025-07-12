import { LabelManager } from "@/components/common/inputs/label-handler";
import InputSelect from "@/components/common/inputs/select-input";
import InputText from "@/components/common/inputs/text-input-with-label";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

export default function AddPropertyStepThree({
  formik,
  yard_type,
  setYard_type,
  tags,
  setTags,
}) {
  const t = useTranslations("Dashboard")
  const inputs = [
    {
      text: t("roomCount"),
      placeHolder: null,
      isSelect: false,
      name: "rooms",
      value: formik.values.rooms,
      validation:
        formik.touched.rooms && formik.errors.rooms ? (
          <div className="text-red-500 text-sm mt-1 ">
            {formik.errors.rooms}
          </div>
        ) : null,
    },
    {
      text: t("bathroomCount"),
      placeHolder: null,
      isSelect: false,
      name: "bathrooms",
      value: formik.values.bathrooms,
      validation:
        formik.touched.bathrooms && formik.errors.bathrooms ? (
          <div className="text-red-500 text-sm mt-1 ">
            {formik.errors.bathrooms}
          </div>
        ) : null,
    },

    {
      text: t("parkingCount"),
      placeHolder: null,
      isSelect: false,
      name: "parking",
      value: formik.values.parking,
      validation:
        formik.touched.parking && formik.errors.parking ? (
          <div className="text-red-500 text-sm mt-1 ">
            {formik.errors.parking}
          </div>
        ) : null,
    },
    {
      text: t("yardType"),
      placeHolder: null,
      isSelect: true,
      value: yard_type,
      items: [
        { value: "روستایی", text: t("village") },
        { value: "ساحلی", text: t("beach") },
        { value: "شهری", text: t("city") },
        { value: "جنگلی", text: t("jungle")},
      ],
      onChange: (e) => setYard_type(e),
    },
  ];
  return (
    <>
      <div className="mt-[33px] grid w-full lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-x-[63px] gap-y-[19px] relative">
        {inputs.map((item, index) => {
          return !item.isSelect ? (
            <div key={index}>
              <InputText
                name={item.name}
                value={item.value}
                onChange={formik.handleChange}
                placeHolder={item.placeHolder}
                label={item.text}
              />
              {item.validation}
            </div>
          ) : (
            <Fragment key={index}>
              <InputSelect
                value={item.value}
                onChange={item.onChange}
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
        modalTitle={t("addTag")}
        inputTitle={t("tags")}
        emptyState={t("noTag")}
      />
    </>
  );
}
