import { TodoStatus } from "../constants/TodoStatus";
import { displayDate } from "../function/Index";

export const Todo = (props: any) => {
  return (
    <tr
      className={
        props.todo.status === "done" && props.filterStatusValue === ""
          ? "opacity-20"
          : ""
      }
    >
      <td className="px-3.5 py-1.5">{props.todo.id}</td>
      <td className="px-3.5 py-1.5">{TodoStatus[props.todo.status]}</td>
      <td className="px-3.5 py-1.5">{props.todo.title}</td>
      <td className="px-3.5 py-1.5">{props.todo.detail}</td>
      <td className="px-3.5 py-1.5">{displayDate(props.todo.deadline)}</td>
      <td className="px-3.5 py-1.5">{displayDate(props.todo.createdAt)}</td>
      <td className="px-3.5 py-1.5">{displayDate(props.todo.updateAt)}</td>
      <td className="px-3.5 py-1.5">
        <button
          className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-3"
          onClick={() => props.onClickEdit(props.todo)}
        >
          編集
        </button>
        <button
          className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => props.onClickDelete(props.todo.id)}
        >
          削除
        </button>
      </td>
    </tr>
  );
};
