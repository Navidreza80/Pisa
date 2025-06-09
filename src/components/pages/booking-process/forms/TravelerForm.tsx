import InputText from "@/components/common/inputs/text-input-with-label";
import InputSelect from "@/components/common/inputs/select-input";
import { TravelerData, ValidationErrors } from "@/types/booking";

const TravelerForm = ({
  travelerIndex,
  data,
  errors,
  handleInputChange,
}: {
  travelerIndex: number;
  data: TravelerData;
  errors: ValidationErrors;
  handleInputChange: (index: number, field: keyof TravelerData, value: string) => void;
}) => {
  const fields = [
    { label: "نام شما :", field: "firstName", type: "text" },
    { label: "نام خانوادگی :", field: "lastName", type: "text" },
    { label: "جنسیت شما :", field: "gender", type: "select" },
    { label: "کد ملی :", field: "nationalId", type: "text" },
    { label: "تاریخ تولد :", field: "birthDate", type: "text" },
  ];

  const selectOptions = [{ text: "آقا" }, { text: "خانم" }];

  return (
    <div className="flex w-full flex-wrap gap-4 pb-3">
      <h1 className="w-full text-right py-2 text-primary text-2xl font-semibold">
        مسافر {travelerIndex + 1}
      </h1>
      {fields.map(({ label, field, type }) => (
        <div key={field} className="flex-grow min-w-[200px]">
          {type === "select" ? (
            <InputSelect
              withLabel
              items={selectOptions}
              label={label}
              color="bg-border/30 border-border rounded-xl"
              value={data[field]}
              onChange={(val: string) =>
                handleInputChange(travelerIndex, field as keyof TravelerData, val)
              }
              className="!w-full"
            />
          ) : (
            <InputText
              label={label}
              color="bg-border/30 border-border rounded-xl"
              value={data[field]}
              onChange={(e) =>
                handleInputChange(travelerIndex, field as keyof TravelerData, e.target.value)
              }
              className="w-full"
            />
          )}
          {errors[field] && (
            <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TravelerForm;
