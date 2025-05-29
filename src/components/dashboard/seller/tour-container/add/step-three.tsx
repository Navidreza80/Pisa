import { LabelManager } from "@/components/common/inputs/label-handler";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/react-redux/store/hook";
import { setTourObject } from "@/utils/hooks/react-redux/store/slices/create-tour";
import { useEffect, useState } from "react";

export const AddTourStepThree = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [facilities, setFacilities] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  // Change filters params logic
  const handleChange = (name: string, value: any) => {
    dispatch(setTourObject({ [name]: value }));
  };
  useEffect(() => {
    handleChange("facilities", facilities);
    handleChange("features", features);
    handleChange("services", services);
    handleChange("tags", tags);
  }, [tags, services, features, facilities]);

  const tour = useAppSelector((state) => state.createTour)

  console.log(tour)

  const inputs = [
    {
      placeHolder: "شام و صبحانه رایگان...",
      modalTitle: "اضافه کردم خدمات",
      inputTitle: ": خدمات",
      labels: services,
      onChange: setServices,
      maxLabels: 4,
    },
    {
      placeHolder: "تور ویژه تابستانه...",
      modalTitle: "اضافه کردن برچسب",
      inputTitle: ": برچسب",
      labels: tags,
      onChange: setTags,
      maxLabels: 1,
    },
    {
      placeHolder: "راهنمای مجرب...",
      modalTitle: "اضافه کردن مزایا",
      inputTitle: ": مزایا",
      labels: features,
      onChange: setFeatures,
      maxLabels: 4,
    },
    {
      placeHolder: "هدیه ویژه...",
      modalTitle: "اضافه کردن امکانات",
      inputTitle: ": امکانات",
      labels: facilities,
      onChange: setFacilities,
      maxLabels: 4,
    },
  ];
  return (
    <div className="flex gap-y-3 flex-wrap my-5">
      {inputs.map((item, index) => {
        return (
          <div className="w-full" key={index}>
            <h1 className="text-text text-[20px] font-semibold mb-1">
              {item.inputTitle}
            </h1>
            <LabelManager
              placeholder={item.placeHolder}
              modalTitle={item.modalTitle}
              inputTitle={item.inputTitle}
              labels={item.labels}
              onChange={item.onChange}
              maxLabels={item.maxLabels}
            />
          </div>
        );
      })}
    </div>
  );
};
