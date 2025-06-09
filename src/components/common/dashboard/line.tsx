function Line({ className }: { className?: string }) {
  return (
    <div
      className={`border-b-2 border-dashed border-[#88888842] my-[19px] ${className}`}
    />
  );
}

export default Line;
