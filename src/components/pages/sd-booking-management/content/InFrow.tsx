export function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span>{label}:</span>
      <span className="font-medium text-right">{value || "-"}</span>
    </div>
  );
}
