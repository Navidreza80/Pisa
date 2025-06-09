import { useAppDispatch } from "@/utils/hooks/react-redux/store/hook";
import Button from "../../../common/button";
import InputText from "../../../common/inputs/text-input-with-label";
import { TravelersSVG } from "../../../svg";
import Body from "../contents/Body";
import Header from "../contents/Header";
import {
  setSharedEmail,
  setSharedMobile,
} from "@/utils/hooks/react-redux/store/slices/book-hotel-slice";
import { useFormik } from "formik";

const SendToOthersForm = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      sharedEmail: "",
      sharedMobile: "",
    },
    onSubmit: (values) => {
      dispatch(setSharedEmail(values.sharedEmail));
      dispatch(setSharedMobile(values.sharedMobile));
      console.log(values)
    },
  });
  return (
    <Body>
      <Header>
        <h2 className="flex gap-3 items-center text-sm md:text-base flex-wrap">
          <span className="text-primary">
            (ارسال بلیط به ایمیل و شماره همراه دیگر)
          </span>
          ارسال بلیط به دیگری <TravelersSVG color="black" />
        </h2>
      </Header>

      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex-col md:flex-row justify-between flex px-2 md:px-4 py-3 md:py-5 gap-4 md:gap-0"
      >
        <div className="w-full md:w-5/12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[22px] order-1 md:order-2">
          <InputText
            name="sharedEmail"
            color="bg-border/30 border-border rounded-xl"
            label="ایمیل :"
            value={formik.values.sharedEmail}
            onChange={formik.handleChange}
          />
          <InputText
            name="sharedMobile"
            color="bg-border/30 border-border rounded-xl"
            label="شماره تلفن :"
            value={formik.values.sharedMobile}
            onChange={formik.handleChange}
          />
        </div>
        <Button className="bg-transparent !text-text border-2 border-primary text-sm md:text-base order-2 md:order-1">
          ثبت اطلاعات
        </Button>
      </form>
    </Body>
  );
};
export default SendToOthersForm;
