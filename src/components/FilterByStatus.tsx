const baseButtonClass =
  "px-4 py-2 text-sm font-medium bg-white border border-gray-200 focus:z-10";
const defaultStyle = " text-gray-900";
const buttonGroupButtonClassNameHover = " bg-indigo-600 text-white";
const buttonGroupButtonClassNameL = baseButtonClass + " rounded-l-lg ";
const buttonGroupButtonClassNameM = baseButtonClass + " border-t border-b ";
const buttonGroupButtonClassNameR = baseButtonClass + " rounded-r-md";

export const FilterByStatus = (props: any) => {
  return (
    <>
      <dl>
        <dt className="inline-block mr-4">
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
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
          ステータスで絞り込み
        </dt>
        <dd className="inline-flex rounded-md shadow-sm mt-4" role="group">
          <button
            type="button"
            className={
              !props.isFiltering
                ? buttonGroupButtonClassNameL + buttonGroupButtonClassNameHover
                : buttonGroupButtonClassNameL + defaultStyle
            }
            onClick={() => props.onClickButton("")}
          >
            全て
          </button>
          <button
            type="button"
            className={
              props.filterStatusValue === "notStarted"
                ? buttonGroupButtonClassNameM + buttonGroupButtonClassNameHover
                : buttonGroupButtonClassNameM + defaultStyle
            }
            onClick={() => props.onClickButton("notStarted")}
          >
            未着手
          </button>
          <button
            type="button"
            className={
              props.filterStatusValue === "doing"
                ? buttonGroupButtonClassNameM + buttonGroupButtonClassNameHover
                : buttonGroupButtonClassNameM + defaultStyle
            }
            onClick={() => props.onClickButton("doing")}
          >
            着手
          </button>
          <button
            type="button"
            className={
              props.filterStatusValue === "done"
                ? buttonGroupButtonClassNameR + buttonGroupButtonClassNameHover
                : buttonGroupButtonClassNameR
            }
            onClick={() => props.onClickButton("done")}
          >
            完了
          </button>
        </dd>
      </dl>
    </>
  );
};
