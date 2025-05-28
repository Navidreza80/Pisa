import InputText from "@/components/common/inputs/text-input-with-label";

export default function AddTourStepOne() {
  const inputs = [
    { text: "نام تور :", placeHolder: "تور سالار دره", value: "tourName" },
    {
      text: "آدرس تور :",
      placeHolder: "ساری هتل سالار دره",
      value: "tourLocation",
    },

    { text: "تاریخ شروع :", placeHolder: null, value: "startDate" },
    { text: "تاریخ پایان :", placeHolder: null, value: "endDate" },

    {
      text: "امکان کنسلی تا :",
      placeHolder: "5 روز بعد تایید",
      value: "cancelTill",
    },
    { text: "قیمت :", placeHolder: null, value: "price" },
  ];
  return (
    <>
      <div className="mt-[33px] grid w-full grid-cols-2 gap-x-[63px] gap-y-[19px] relative">
        {inputs.map((item, index) => {
          return (
            <InputText
              key={index}
              placeHolder={item.placeHolder}
              label={item.text}
            />
          );
        })}
      </div>
      <InputText
        className="w-full mt-[19px]"
        height="h-[215px]"
        label="توضیحات  تور :"
      />
    </>
  );
}
