import { FaStar } from "react-icons/fa";

export const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-primary" />
      ))}
      {hasHalfStar && <FaStar key="half" className="text-primary opacity-50" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaStar key={`empty-${i}`} className="text-[#898989]" />
      ))}
      <span className="mr-1 text-sm text-text-secondary">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
};
