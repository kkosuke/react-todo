export const TodoDeadlineInput = (props: any) => {
  let oneWeekLetter = new Date();
  oneWeekLetter.setDate(oneWeekLetter.getDate() + 7);
  oneWeekLetter.setMinutes(0);
  oneWeekLetter = new Date(oneWeekLetter);
  const deadlineDate = props.todo.deadline
    ? new Date(props.todo.deadline)
    : oneWeekLetter;

  const dateInputClassName =
    "bg-white w-18 border ml-2 mr-2 border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";
  let settings = {
    placeholder: "年",
    min: 2022,
    max: 2023,
    v: deadlineDate.getFullYear(),
  };
  switch (props.inputValueType) {
    case "month":
      settings.placeholder = "月";
      settings.min = 1;
      settings.max = 12;
      settings.v = deadlineDate.getMonth() + 1;
      break;
    case "date":
      settings.placeholder = "日";
      settings.min = 1;
      settings.max = 31;
      settings.v = deadlineDate.getDate();
      break;
    case "hours":
      settings.placeholder = "時";
      settings.min = 0;
      settings.max = 24;
      settings.v = deadlineDate.getHours();
      break;
    case "minutes":
      settings.placeholder = "分";
      settings.min = 0;
      settings.max = 59;
      settings.v = deadlineDate.getMinutes();
      break;
  }
  return (
    <>
      <input
        className={dateInputClassName}
        placeholder={settings.placeholder}
        min={settings.min}
        max={settings.max}
        type="number"
        value={settings.v}
        onChange={(e) => props.onInputChange(e, props.inputValueType)}
      />
      {settings.placeholder}
    </>
  );
};