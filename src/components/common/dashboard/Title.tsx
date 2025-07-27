const Title = ({ text, className }: { text: string; className?: string }) => {
  return (
    <h1 className={`text-xl font-medium ${className} py-2 px-2`}>{text}</h1>
  );
};
export default Title;
