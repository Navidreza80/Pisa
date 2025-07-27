const PopoverItem = ({ icon, title }) => {
  return (
    <div className="w-full items-center h-[30px] whitespace-nowrap flex gap-[15px] cursor-pointer hover:bg-border rounded-xl px-1">
      {icon}
      <h1>{title}</h1>
    </div>
  );
};
export default PopoverItem;
