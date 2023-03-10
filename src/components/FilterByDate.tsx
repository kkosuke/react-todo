import { dateFormat } from "../function/Index";
export const FilterByDate = (props: {
  filterDateValues: Date[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
}) => {
  const dateInputClassName =
    "bg-white w-18 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";

  return (
    <>
      <dl className="mt-4">
        <dt className="inline-block mr-4 w-28">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 inline-block mr-1 align-top"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
          期限
        </dt>
        <dd className="inline-flex items-center" role="group">
          <input
            className={dateInputClassName}
            placeholder="開始日"
            type="date"
            value={dateFormat(props.filterDateValues[0])}
            onChange={(e) => props.onInputChange(e, 0)}
            max={dateFormat(props.filterDateValues[1])}
          />
          <span className="ml-2 mr-2">〜</span>
          <input
            className={dateInputClassName}
            placeholder="終了日"
            type="date"
            value={dateFormat(props.filterDateValues[1])}
            onChange={(e) => props.onInputChange(e, 1)}
            min={dateFormat(props.filterDateValues[0])}
          />
        </dd>
      </dl>
    </>
  );
};
