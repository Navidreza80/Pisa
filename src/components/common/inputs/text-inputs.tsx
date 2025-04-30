export default function InputText({ placeHolder }: { placeHolder: string }) {
  return (
    <input
      className="border bg-background border-border  text-[#A6A6A6] w-[155px] h-[48px] px-[11px] rounded-2xl"
      placeholder={placeHolder}
    ></input>
  );
}
