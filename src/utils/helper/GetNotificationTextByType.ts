const GetNotificationTextByType = (type: string) => {
  if (type == "new_property") {
    return "آگهی جدید";
  } else if (type == "new_payment") {
    return "پرداخت جدید";
  } else if (type == "new_discount") {
    return "تخفیف جدید";
  } else if (type == "system_notification") {
    return "نوتیفیکیشن سیستم";
  }
};
export default GetNotificationTextByType;
