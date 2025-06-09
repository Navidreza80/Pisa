import BookingList from "@/components/pages/bd-bookings/container"
import { Reservation } from "@/types/reserve"
import { getBookingList } from "@/utils/service/reserve/get"

export default async function Page(){
  const data: Reservation[] = await getBookingList()

  return (
    <BookingList bookingList={data} />
  )
}