export const FilterByID = (props: {
  filterIdValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const inputClassName =
    "block bg-white w-full border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";
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
              d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
            />
          </svg>
          ID
        </dt>
        <dd className="inline-flex" role="group">
          <input
            className={inputClassName}
            placeholder="IDを入力"
            type="text"
            name="idSearch"
            value={props.filterIdValue}
            onChange={(e) => props.onInputChange(e)}
          />
        </dd>
      </dl>
    </>
  );
};
