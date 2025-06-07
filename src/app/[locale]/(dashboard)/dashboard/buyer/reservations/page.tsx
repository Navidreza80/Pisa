import BookingList from "@/components/dashboard/buyer/reserve-container"
import { Reservation } from "@/types/reserve"
import formatToPersianDateWithMoment from "@/utils/helper/format-date"
import { getBookingList } from "@/utils/service/reserve/get"

export default async function Page(){
  const data: Reservation[] = await getBookingList()
  console.log(data)
  console.log(formatToPersianDateWithMoment(data[0].reservedDates.value))
  return (
    <BookingList bookingList={data} />
  )
}