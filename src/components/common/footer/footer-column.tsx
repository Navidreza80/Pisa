/**
 * Reusable footer columns component.
 * 
 * @component
 * @param {title, items} props - Component props
 * @returns {JSX.Element} - Rendered footer column
 */

export default function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: Array<{ text: string; className?: string; highlight?: boolean }>;
}) {
  return (
    <div className="flex flex-col items-end">
      <h3 className="font-bold mb-4 text-text text-right">{title}</h3>
      {items.map((item, index) => (
        <p
          key={`item-${index}`}
          className={`text-right ${item.className} ${
            item.highlight
              ? "text-[#1E1E1E] dark:text-[#c8c8c8]"
              : "text-text-secondary"
          }`}
        >
          {item.text}
        </p>
      ))}
    </div>
  );
}
