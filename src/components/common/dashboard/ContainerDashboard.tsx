const ContainerDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="animate-fade-up flex-1 bg-background p-8 rounded-[12px]">
      {children}
    </section>
  );
};
export default ContainerDashboard;
