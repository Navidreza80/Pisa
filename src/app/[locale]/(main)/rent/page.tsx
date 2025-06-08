// Third party components
import Rent from "@/components/pages/rent-mortgage-list/container";

/**
 * rent page - Displays houses that are for rent
 *
 * @page
 * @route /rent
 *
 * Features:
 * - Rent & mortgage houses display
 * - Live filter and search
 * - Responsive
 * - DarkMode
 * - 4 language support
 * - Loading skeleton for loading statement
 *
 */

export default function RentPage() {
  return (
    <div className="flex justify-center">
      <Rent />
    </div>
  );
}
