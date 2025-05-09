export default async function SectionName({
  sectionName,
}: {
  sectionName: string;
}) {
  return <h2 className="animate-fade-left text-primary">{sectionName}</h2>;
}
