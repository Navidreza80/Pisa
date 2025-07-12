import Button from "@/components/common/button";
import InputSelect from "@/components/common/inputs/select-input";
import InputText from "@/components/common/inputs/text-input-with-label";
import LoadingCustomized from "@/components/common/loading";
import getAllCategories from "@/utils/service/categories/categories";
import { getRecommendedDescription } from "@/utils/service/recommendation/recommendCaption";
import { getRecommendedTitle } from "@/utils/service/recommendation/recommendTitle";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function AddPropertyStepOne({
  formik,
  setCategories,
  setTransaction_type,
  title,
  setTitle,
  transaction_type,
  categories,
}) {
  const t = useTranslations("Dashboard")
  const { data: categoryList } = useQuery({
    queryKey: ["CATEGORIES"],
    queryFn: () => getAllCategories(),
  });

  const { mutate: getTitleRecommendation, isPending } = useMutation({
    mutationKey: ["GET_RECOMMENDATION"],
    mutationFn: () => getRecommendedTitle(title),
    onError: (e) => toast.error(e),
    onSuccess: (res) => setTitle(res),
  });

  const { mutate: getDescriptionRecommendation, isPending: descPending } =
    useMutation({
      mutationKey: ["GET_CAPTION_RECOMMENDATION"],
      mutationFn: () =>
        getRecommendedDescription({
          title: title,
          capacity: formik.values.capacity,
          caption: formik.values.caption,
          categories: categories,
          transactionType: transaction_type,
          price: formik.values.price,
        }),
      onError: (e) => toast.error(e),
      onSuccess: (res) => (formik.values.caption = res),
    });

  if (!categories) return <LoadingCustomized title={t("loadingInformation")}/>;

  const inputs = [
    {
      text: t("capacity2"),
      placeHolder: null,
      isSelect: false,
      name: "capacity",
      value: formik.values.capacity,
      validation:
        formik.touched.capacity && formik.errors.capacity ? (
          <div className="text-red-500 text-sm mt-1 ">
            {formik.errors.capacity}
          </div>
        ) : null,
    },

    {
      text: t("price2"),
      placeHolder: t("rial"),
      isSelect: false,
      name: "price",
      value: formik.values.price,
      validation:
        formik.touched.price && formik.errors.price ? (
          <div className="text-red-500 text-sm mt-1 ">
            {formik.errors.price}
          </div>
        ) : null,
    },
    {
      text: t("transactionType"),
      placeHolder: null,
      isSelect: true,
      items: [
        { value: "reservation", text: t("reserve") },
        { value: "mortgage", text: t("mortgage") },
        { value: "rental", text: t("rent") },
        { value: "direct_purchase", text: t("directPurchase") },
      ],
      onChange: (e) => setTransaction_type(e),
      value: transaction_type,
    },
    {
      text: t("propertyType"),
      placeHolder: null,
      isSelect: true,
      items: categoryList?.data,
      onChange: (e) => setCategories(e),
      value: categories,
    },
  ];

  return (
    <>
      <div
        
        className="mt-5 md:mt-[33px] grid w-full grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-4 md:gap-x-[63px] gap-y-[19px] relative"
      >
        <div  className={`relative`}>
          <div className="text-fade font-medium text-[13px] absolute top-[-10] bg-background right-2 px-2">
            {t("propertyType")}
          </div>
          <input
            name="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            className="w-full border bg-background border-border placeholder:text-text text-text h-[48px] px-[11px] rounded-2xl focus:outline-0 outline-0"
            placeholder={t("propertyTitlePlaceholder")}
          ></input>
          {title.length > 10 && (
            <Button
              type="button"
              handleClick={() => getTitleRecommendation()}
              className="w-auto bg-gradient-to-r from-purple-600 cursor-pointer via-indigo-500 to-blue-500 text-white font-semibold shadow-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 rounded-xl px-4 py-2 absolute top-0 left-2"
            >
              {isPending ? <ClipLoader color="white" /> : t("writeWithAI")}
            </Button>
          )}
        </div>
        {inputs.map((item, index) => {
          return !item.isSelect ? (
            <div key={index}>
              <InputText
                name={item.name}
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
      <div  className={`relative`}>
        {" "}
        <InputText
          name="caption"
          value={formik.values.caption}
          onChange={formik.handleChange}
          className="w-full mt-[19px]"
          height="h-[150px] md:h-[215px]"
          label={t("propertyDescriptionPlaceholder")}
        />
        {title.length > 10 &&
          formik.values.capacity &&
          categories &&
          transaction_type &&
          formik.values.price &&
          formik.values.caption && (
            <Button
              type="button"
              handleClick={() => getDescriptionRecommendation()}
              className="w-auto bg-gradient-to-r from-purple-600 cursor-pointer via-indigo-500 to-blue-500 text-white font-semibold shadow-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 rounded-xl px-4 py-2 absolute top-0 left-2"
            >
              {descPending ? <ClipLoader color="white" /> : t("writeWithAI")}
            </Button>
          )}
      </div>
      {formik.touched.caption && formik.errors.caption ? (
        <div className="text-red-500 text-sm mt-1 ">
          {formik.errors.caption}
        </div>
      ) : null}
    </>
  );
}
