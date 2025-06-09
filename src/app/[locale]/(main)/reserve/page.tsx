// Third party components
import ReserveListContainer from "@/components/pages/reserve-list/container";

/**
 * ReservePage - Displays houses that are for reservation
 *
 * @page
 * @route /reserve
 *
 * Features:
 * - Reservation houses display
 * - Live filter and search
 * - Responsive
 * - DarkMode
 * - 4 language support
 * - Loading skeleton for loading statement
 *
 */

export default async function ReservePage() {
  return <ReserveListContainer />;
}
