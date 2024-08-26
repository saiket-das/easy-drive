import dayjs from "dayjs";

export const convertToHHMMFormat = (timeValue: string | Date | dayjs.Dayjs) => {
  if (!timeValue) return "";

  const time = dayjs(timeValue);

  if (!time.isValid()) return "";

  return time.format("HH:mm");
};
