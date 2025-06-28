export const getTransactionType = (type) => {
  if (type == "rental") return { text: "اجاره", color: "light-primary" };
  if (type == "reservation") return { text: "رزرو", color: "light-warning" };
  if (type == "direct_purchase") return { text: "نقدی", color: "light-info" };
  if (type == "mortgage") return { text: "رهن", color: "light-success" };
};
