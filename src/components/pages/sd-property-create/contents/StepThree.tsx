import InputSelect from "@/components/common/inputs/select-input";
import InputText from "@/components/common/inputs/text-input-with-label";
import { ArrowLeftSVG } from "@/components/svg";

export default function AddPropertyStepThree() {
  const inputs = [
    { text: "تعداد اتاق:", placeHolder: null, isSelect: false },
    {
      text: "تعداد حمام:",
      placeHolder: null,
      isSelect: false,
    },

    { text: "تعداد پارکینگ:", placeHolder: null, isSelect: false },
    { text: "نوع حیاط:", placeHolder: null, isSelect: true },
  ];
  return (
    <>
      <div className="mt-[33px] grid w-full lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-x-[63px] gap-y-[19px] relative">
        {inputs.map((item, index) => {
          return !item.isSelect ? (
            <InputText
              key={index}
              placeHolder={item.placeHolder}
              label={item.text}
            />
          ) : (
            <>
              {index == 4 && (
                <ArrowLeftSVG className="absolute left-[calc(50%-11px)] top-36" />
              )}
              <InputSelect withLabel label={item.text} className="!w-full" />
            </>
          );
        })}
      </div>
      <InputSelect className="!w-full mt-[19px]" withLabel label="برچسب  ها:" />
    </>
  );
}
