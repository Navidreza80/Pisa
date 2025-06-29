import Button from "@/components/common/button";
import InputSelect from "@/components/common/inputs/select-input";
import InputText from "@/components/common/inputs/text-input-with-label";
import LoadingCustomized from "@/components/common/loading";
import getAllCategories from "@/utils/service/categories/categories";
import { getRecommendedTitle } from "@/utils/service/recommendation/recommendTitle";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function AddPropertyStepOne({
  formik,
  setCategories,
  setTransaction_type,
  title,
  setTitle,
}) {
  const { data: categories } = useQuery({
    queryKey: ["CATEGORIES"],
    queryFn: () => getAllCategories(),
  });

  const { mutate: getTitleRecommendation, isPending } = useMutation({
    mutationKey: ["GET_RECOMMENDATION"],
    mutationFn: () => getRecommendedTitle(title),
    onError: (e) => toast.error(e),
  });

  if (!categories) return <LoadingCustomized title="درحال پردازش اطلاعات..." />;

  const inputs = [
    {
      text: "ظرفیت(نفر):",
      placeHolder: null,
      isSelect: false,
      name: "capacity",
      value: formik.values.capacity,
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
      text: "نوع ملک:",
      placeHolder: null,
      isSelect: true,
      items: categories.data,
      onChange: (e) => setCategories(e),
    },
  ];

  return (
    <>
      <div
        dir="rtl"
        className="mt-5 md:mt-[33px] grid w-full grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-4 md:gap-x-[63px] gap-y-[19px] relative"
      >
        <div dir="rtl" className={`relative`}>
          <div className="text-fade font-medium text-[13px] absolute top-[-10] bg-background right-2 px-2">
            نام ملک:
          </div>
          <input
            name="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            className="w-full border bg-background border-border placeholder:text-text text-text h-[48px] px-[11px] rounded-2xl focus:outline-0 outline-0"
            placeholder="آپارتمان لوکس در ساری"
          ></input>
          {title.length > 10 && (
            <Button
              handleClick={() => getTitleRecommendation()}
              className="w-auto bg-gradient-to-r from-purple-600 cursor-pointer via-indigo-500 to-blue-500 text-white font-semibold shadow-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 rounded-xl px-4 py-2 absolute top-0 left-2"
            >
              {isPending ? <ClipLoader color="white" /> : "نوشتن با AI"}
            </Button>
          )}
        </div>
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
