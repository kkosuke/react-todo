import {TodoStatus} from "../constants/TodoStatus";

export const Todo = (props) =>{
  return (
      <tr>
        <td className="px-3.5 py-1.5">{props.todo.id}</td>
        <td className="px-3.5 py-1.5">{TodoStatus[props.todo.status]}</td>
        <td className="px-3.5 py-1.5">{props.todo.title}</td>
        <td className="px-3.5 py-1.5">{props.todo.detail}</td>
        <td>
          <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-3" onClick={() => props.onClickEdit(props.todo)}>編集</button>
          <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => props.onClickDelete(props.todo.id)}>削除</button>
        </td>
      </tr>
  )
}