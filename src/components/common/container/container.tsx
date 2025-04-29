export default async function Container({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-center w-full">{children}</div>;
}
