import ArrowSVG from "@/components/common/svg/arrow";

const NotificationStatus = ({ text }: { text: string }) => {
  return (
    <tr>
      <td className="flex w-full relative !my-[13px]">
        <p className="absolute right-0 top-[-10] bg-background pl-1 text-base font-medium text-fade">
          {text}
        </p>
        <div className="grow border border-border h-[1px]" />
      </td>
      <td className="!my-[13px]">
        <div className="grow border border-border h-[0.5px]" />
      </td>
      <td className="w-full relative flex !my-[13px]">
        <div className="grow border border-border h-[1px]" />
        <ArrowSVG className="absolute left-0 pr-1 bg-background top-[-9]" />
      </td>
    </tr>
  );
};
export default NotificationStatus;
