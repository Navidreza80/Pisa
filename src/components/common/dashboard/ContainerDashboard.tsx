const ContainerDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="animate-fade-up flex-1 bg-background p-8 rounded-[12px]">
      {children}
    </div>
  );
};
export default ContainerDashboard;
