import { sortOderValueType } from "../types/Index";

export const SortButton = (props: {
  labelName: string;
  typeName: string;
  sortOder: {
    [key: string]: sortOderValueType;
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
        {props.sortOder[props.typeName] === "none"
          ? ""
          : props.sortOder[props.typeName] === "asc"
          ? "▲"
          : "▼"}
      </button>
    </>
  );
};
