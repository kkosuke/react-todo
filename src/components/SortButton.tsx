export const SortButton = (props: any) => {
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
