import InputText from "@/components/common/inputs/text-input-with-label";
import InputSelect from "@/components/common/inputs/select-input";
import { TravelerData, ValidationErrors } from "@/types/booking";
import { useTranslations } from "next-intl";

const TravelerForm = ({
  travelerIndex,
  data,
  errors,
  handleInputChange,
}: {
  travelerIndex: number;
  data: TravelerData;
  errors: ValidationErrors;
  handleInputChange: (
    index: number,
    field: keyof TravelerData,
    value: string
  ) => void;
}) => {
  const t = useTranslations("ReserveDetail");
  const fields = [
    { label: t("yourName"), field: "firstName", type: "text" },
    { label: t("yourLastName"), field: "lastName", type: "text" },
    { label: t("yourGender"), field: "gender", type: "select" },
    { label: t("yourNationalCode"), field: "nationalId", type: "text" },
    { label: t("yourBirthDate"), field: "birthDate", type: "text" },
  ];

  const selectOptions = [{ text: t("man") }, { text: t("woman") }];

  return (
    <div className="flex w-full flex-wrap gap-4 pb-3">
      <h1 className="w-full  py-2 text-primary text-2xl font-semibold">
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
                handleInputChange(
                  travelerIndex,
                  field as keyof TravelerData,
                  val
                )
              }
              className="!w-full"
            />
          ) : (
            <InputText
              label={label}
              color="bg-border/30 border-border rounded-xl"
              value={data[field]}
              onChange={(e) =>
                handleInputChange(
                  travelerIndex,
                  field as keyof TravelerData,
                  e.target.value
                )
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
