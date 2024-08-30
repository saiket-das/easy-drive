export function formatDateWithSuffix(dateStr: string): string {
  const date = new Date(dateStr);

  // Get the day of the month
  const day = date.getDate();

  // Determine the suffix for the day
  const getDaySuffix = (day: number): string => {
    if (day > 3 && day < 21) return "th"; // 11th to 13th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Format the date to "30 Aug 2024"
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  // Combine the day with the suffix and the formatted date
  const dayWithSuffix = day + getDaySuffix(day);
  return `${dayWithSuffix} ${formattedDate.slice(3)}`;
}
