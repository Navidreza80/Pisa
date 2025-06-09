/**
 * Determines a person's age group based on their birth date
 * @param birthDate Date object or string in 'YYYY-MM-DD' format
 * @returns Age group category
 */
export function getAgeGroup(birthDate: Date | string): string {
  // Convert string input to Date if needed
  const birthDateObj =
    typeof birthDate === "string" ? new Date(birthDate) : birthDate;
  const today = new Date();

  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();

  // Adjust age if birthday hasn't occurred yet this year
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
  ) {
    age--;
  }

  // Age group classification
  if (age < 1) {
    return "نوزاد"; // Infant
  } else if (age < 6) {
    return "خردسال"; // Toddler
  } else if (age < 13) {
    return "کودک"; // Child
  } else if (age < 18) {
    return "نوجوان"; // Teenager
  } else if (age < 30) {
    return "جوان"; // Young adult
  } else if (age < 45) {
    return "میان سال"; // Middle-aged
  } else if (age < 60) {
    return "بزرگسال"; // Adult
  } else if (age < 75) {
    return "سالمند"; // Elderly
  } else {
    return "کهنسال"; // Very elderly
  }
}

// Example usage:
const birthDate = "1990-05-15";
console.log(getAgeGroup(birthDate)); // Output will depend on current date
