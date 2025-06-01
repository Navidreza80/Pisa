import moment from "moment-jalaali";

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("fa-IR").format(date);
};

moment.locale("fa", {
  jMonths: [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ],
});
moment.locale("fa"); // فعال‌سازی locale فارسی

export default function formatToPersianDate(date) {
  const persianDate = moment(date);
  return persianDate.format("jD jMMMM jYYYY / HH:mm");
}
