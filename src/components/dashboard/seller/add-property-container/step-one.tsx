import InputSelect from "@/components/common/inputs/select-input";
import InputText from "@/components/common/inputs/text-input-with-label";
import { ArrowLeftSVG } from "@/components/svg";

export default function AddPropertyStepOne() {
  const inputs = [
    { text: "ظرفیت(نفر):", placeHolder: null, isSelect: false },
    {
      text: "نام ملک:",
      placeHolder: "آپارتمان لوتوس 102 در ساری ",
      isSelect: false,
    },

    { text: "قیمت:", placeHolder: "ریال", isSelect: false },
    { text: "نوع معامله:", placeHolder: null, isSelect: true },

    { text: "زیرنوع ملک:", placeHolder: null, isSelect: true },
    { text: "نوع ملک:", placeHolder: null, isSelect: true },
  ];
  return (
    <>
      <div className="mt-[33px] grid w-full grid-cols-2 gap-x-[63px] gap-y-[19px] relative">
        {inputs.map((item, index) => {
          return !item.isSelect ? (
            <InputText
              key={index}
              placeHolder={item.placeHolder}
              label={item.text}
            />
          ) : (
            <>
              {index == 4 && <ArrowLeftSVG className="absolute left-[calc(50%-11px)] top-36" />}
              <InputSelect withLabel label={item.text} className="!w-full" />
            </>
          );
        })}
      </div>
      <InputText
        className="w-full mt-[19px]"
        height="h-[215px]"
        label="توضیحات  ملک:"
      />
    </>
  );
}
