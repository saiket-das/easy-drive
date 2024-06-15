export const calculateTotalCost = (
  startTime: string,
  endTime: string,
  pricePerHour: number
): number => {
  // parse the time strings to get hours and minutes
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  // calculate the total minutes for start and end times
  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  // calculate the difference in minutes
  const durationInMinutes = endTotalMinutes - startTotalMinutes;

  // convert duration from minutes to hours
  const durationInHours = durationInMinutes / 60;

  // calculate the total cost
  const totalCost = durationInHours * pricePerHour;

  return totalCost;
};
