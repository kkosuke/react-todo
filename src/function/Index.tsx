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
  dateFormat.setHours(startOrEnd < 1 ? 0 : 59);
  dateFormat.setMinutes(startOrEnd < 1 ? 0 : 59);
  dateFormat.setSeconds(startOrEnd < 1 ? 0 : 59);
  dateFormat.setMilliseconds(startOrEnd < 1 ? 0 : 59);
  return new Date(dateFormat);
};
