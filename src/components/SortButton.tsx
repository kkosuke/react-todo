import { sortValueType } from "../types/Index";

export const SortButton = (props: {
  labelName: string;
  typeName: string;
  sortValue: {
    [key: string]: sortValueType;
  };
  onClickButton: (typeName: string) => void;
}) => {
  return (
    <>
      <button
        type="button"
        onClick={() => props.onClickButton(props.typeName)}
        className="text-indigo-600"
      >
        {props.labelName}{" "}
        {props.sortValue[props.typeName] === "none"
          ? ""
          : props.sortValue[props.typeName] === "asc"
          ? "▲"
          : "▼"}
      </button>
    </>
  );
};
