"use client";
import { useAppDispatch } from "@/utils/hooks/react-redux/store/hook";
import { setTourObject } from "@/utils/hooks/react-redux/store/slices/create-tour";
import { UploadDropzone } from "@/utils/uploadthing";

const AddTourStepFour = () => {
  const dispatch = useAppDispatch();

  // Change filters params logic
  const handleChange = (name: string, value: any) => {
    dispatch(setTourObject({ [name]: value }));
  };

  return (
    <div className="mt-8 flex flex-col justify-center items-center">
      <div className="flex flex-row-reverse justify-start flex-wrap text-[20px] font-bold w-full">
        <h1 className="text-base font-medium mb-[19px] w-full text-text-secondary">
          تصاویر تور
        </h1>
        <h2 className="text-primary">.یک تصویر بهتر از هزار کلمه</h2>
        <h2 className="text-text font-semibold">
          .با قرار دادن عکس شانس دیده شدن تور تان را ۵ برابر کنید
        </h2>
      </div>
      <div className="mt-[81px] flex flex-wrap gap-[30px]">
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            handleChange("tourImage", res[0].url);
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
    </div>
  );
};
export default AddTourStepFour;
