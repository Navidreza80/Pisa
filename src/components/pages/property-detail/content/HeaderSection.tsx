import MapSVG from "@/components/common/svg/map";

export default async function HeaderSection({
  address,
  title,
}: {
  address: string;
  title: string;
}) {
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-[32px] text-text font-bold">{title}</h1>
      <h3 className="text-text-secondary flex gap-2 justify-end">
        {address}
        <MapSVG color="gray" />
      </h3>
    </div>
  );
}
