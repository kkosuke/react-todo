import { deadlineType } from "../types/Index";

export const displayDate = (dateFormat: Date) => {
  if (dateFormat) {
    dateFormat = new Date(dateFormat);
    return dateFormat.toLocaleTimeString([], {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    return "-";
  }
};

export const filterDateSetting = (dateFormat: Date, startOrEnd: number) => {
  dateFormat = new Date(dateFormat);
  dateFormat.setHours(startOrEnd < 1 ? 0 : 23);
  dateFormat.setMinutes(startOrEnd < 1 ? 0 : 59);
  dateFormat.setSeconds(startOrEnd < 1 ? 0 : 59);
  dateFormat.setMilliseconds(startOrEnd < 1 ? 0 : 59);
  return new Date(dateFormat);
};

export const dateFormat = (date: Date) => {
  let m = String(date.getMonth() + 1); // 表示するには jsの月は+1する
  m = m.length < 2 ? "0" + m : m;
  let d = String(date.getDate());
  d = d.length < 2 ? "0" + d : d;
  return date.getFullYear() + "-" + m + "-" + d;
};

export const generateDeadline = (
  deadlineDate: Date,
  updateType: deadlineType,
  updateValue: number
) => {
  switch (updateType) {
    case "year":
      deadlineDate.setFullYear(updateValue);
      break;
    case "month":
      deadlineDate.setMonth(updateValue); // jsで受け取り、jsで返すので+-などはしない
      break;
    case "date":
      deadlineDate.setDate(updateValue);
      break;
    case "hours":
      deadlineDate.setHours(updateValue);
      break;
    case "minutes":
      deadlineDate.setMinutes(updateValue);
      break;
  }
  return new Date(deadlineDate);
};
