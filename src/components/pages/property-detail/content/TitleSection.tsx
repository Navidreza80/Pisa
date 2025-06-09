export default async function TitleSection({
  textContent,
}: {
  textContent: string;
}) {
  return <h1 className="font-bold animate-fade-down text-2xl text-text">{textContent}</h1>;
}
