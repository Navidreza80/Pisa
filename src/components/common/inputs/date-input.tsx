import PersianCalendar from "persian-calender";

const DateInput = ({ onChange }) => {
  return (
    <div>
      <PersianCalendar
        responsive={true}
        onChange={(date: Date) => onChange(date)}
        animate={true}
        inputStyle={{
          width: "100%",
          height: "48px",
          borderRadius: "16px",
          textAlign: "right",
          borderColor: "#eaeaea",
        }}
        theme="default"
      />
      <span></span>
    </div>
  );
};
export default DateInput;
