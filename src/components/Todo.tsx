import { TODO_STATUS } from "../constants/Index";
import { displayDate } from "../function/Index";
import { todoType, todoStatusType } from "../types/Index";

export const Todo = (props: {
  todo: todoType;
  onClickEdit: (todo: todoType) => void;
  onClickDelete: (id: string) => void;
  filterStatusValue: todoStatusType;
}) => {
  return (
    <tr
      className={
        props.todo.status === "done" && props.filterStatusValue === ""
          ? "opacity-20"
          : ""
      }
    >
      <td className="px-3.5 py-1.5">{props.todo.id}</td>
      <td className="px-3.5 py-1.5">{TODO_STATUS[props.todo.status]}</td>
      <td className="px-3.5 py-1.5">{props.todo.title}</td>
      <td
        className={
          props.todo.detail ? "px-3.5 py-1.5" : "px-3.5 py-1.5 text-gray-400"
        }
      >
        {props.todo.detail ? props.todo.detail : "…無いようです"}
      </td>
      <td className="px-3.5 py-1.5">{displayDate(props.todo.deadline)}</td>
      <td className="px-3.5 py-1.5">{displayDate(props.todo.createdAt)}</td>
      <td className="px-3.5 py-1.5">{displayDate(props.todo.updateAt)}</td>
      <td className="px-3.5 py-1.5">
        <button
          className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 m-1"
          onClick={() => props.onClickEdit(props.todo)}
        >
          編集
        </button>
        <button
          className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 m-1"
          onClick={() => props.onClickDelete(props.todo.id)}
        >
          削除
        </button>
      </td>
    </tr>
  );
};
