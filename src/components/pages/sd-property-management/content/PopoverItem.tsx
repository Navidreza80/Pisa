const PopoverItem = ({
  icon,
  title,
  handleClick,
}: {
  icon: React.ReactNode;
  title: string;
  handleClick?: () => void;
}) => {
  return (
    <div
      onClick={handleClick}
      className="w-full items-center h-[30px] whitespace-nowrap flex gap-[15px] cursor-pointer hover:bg-border rounded-xl px-1"
    >
      {icon}
      <h1>{title}</h1>
    </div>
  );
};
export default PopoverItem;
