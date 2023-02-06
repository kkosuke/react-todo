import React, {useState, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components"
import {MyMemo} from "./components/MyMemo";
import {Todo} from "./components/Todo";
import {TodoStatus} from "./constants/TodoStatus";
import "./index.css"

const SLabel = styled.label`
  cursor: pointer;
`
const initTodo = {
  title: undefined,
  detail: undefined
};

const App = () =>{
  const [todoList, setTodoList] = useState(() => localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")): []);
  const [newTodo, setNewTodo] = useState(initTodo);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const onTodoInputChange = event => setNewTodo({
    ...newTodo,
    title: event.target.value
  });
  const onTodoDetailTextareaChange = event => setNewTodo({
    ...newTodo,
    detail: event.target.value
  })
  const onTodoSubmit = event => {
    event.preventDefault();
    if (newTodo.title.trim()){
      const _newTodo = {
        id: uuidv4(),
        status: "notStarted",
        title: newTodo.title.trim(),
        detail: newTodo.detail.trim(),
      }
      setTodoList([...todoList, _newTodo]);
      setNewTodo(initTodo);
    } else {
      alert('TODOを入力してください');
    }
  }
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  // 押下したTODO以外を残す
  const onClickDelete = (id) => {
    // console.log(todoList);
    const removeItem = todoList.filter((todo) => todo.id !== id);
    setTodoList(removeItem);
  }
  const onClickEdit = (todo) =>{
    setIsEditing(true);
    setCurrentTodo(todo);
  }
  const onEditTodoStatus = event => {
    const thisTodo = {...currentTodo, status:event.target.value}
    setCurrentTodo(thisTodo);
  }
  const onEditSubmit = event => {
    event.preventDefault();
    const updatedItem = todoList.map((todo) => todo.id === currentTodo.id ? currentTodo : todo);
    setIsEditing(false);
    setTodoList(updatedItem);
  }
  return (
    <div className="" style={{
      margin: "20px"
    }}>
      <h1>TODO</h1>
      {
        isEditing ? (
          <>
            <h2>新規TODOを編集</h2>
            <form onSubmit={onEditSubmit}>
              <table>
                <tbody>
                  <tr>
                    <th>ステータス</th>
                    <td>
                      {Object.keys(TodoStatus).map(key => (
                        <SLabel key={key}>
                          <input type="radio" name="TodoStatus" value={key}
                          onChange={onEditTodoStatus}
                          checked={ key === currentTodo.status} />
                          {TodoStatus[key]}
                        </SLabel>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <th>タイトル</th>
                    <td><input type="text" value={currentTodo.title} onChange={onTodoInputChange} className="block bg-white w-full border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"/></td>
                  </tr>
                  <tr>
                    <th>詳細</th>
                    <td><textarea onChange={onTodoDetailTextareaChange} value={currentTodo.detail} className="block bg-white w-full border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"></textarea></td>
                  </tr>
                  <tr>
                    <th>&nbsp;</th>
                    <td><button type="submit" className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">更新</button></td>
                  </tr>
                </tbody>
              </table>
            </form>
          </>
        ) : (
          <>
            <h2>新規TODOを追加</h2>
            <form onSubmit={onTodoSubmit}>
              <table>
                <tbody>
                  <tr>
                    <th>タイトル</th>
                    <td>
                    <label className="relative block">
                      <input className="block bg-white w-full border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="タイトルを入力" type="text" name="search" value={newTodo.title} onChange={onTodoInputChange} />
                    </label>
                    </td>
                  </tr>
                  <tr>
                    <th>詳細</th>
                    <td><textarea onChange={onTodoDetailTextareaChange} value={newTodo.detail} className="block bg-white w-full border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="詳細情報を入力してください"></textarea></td>
                  </tr>
                  <tr>
                    <th>&nbsp;</th>
                    <td><button type="submit" className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">追加</button></td>
                  </tr>
                </tbody>
              </table>
            </form>
          </>
        )
      }
      <section className="mt-5">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium leading-6 text-gray-900">TODO一覧</h2>
          </div>
          <div className="border-t border-gray-200">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-3.5 py-1.5">ID</th>
                <th className="px-3.5 py-1.5">ステータス</th>
                <th className="px-3.5 py-1.5">タイトル</th>
                <th className="px-3.5 py-1.5">詳細</th>
                <th className="px-3.5 py-1.5"></th>
              </tr>
            </thead>
            <tbody>
            {todoList.length ? (
                <>
                  {todoList.map((todo)=>(
                    <Todo key={todo.id}
                      todo={todo}
                      onClickEdit={onClickEdit}
                      onClickDelete={onClickDelete}
                    />
                  ))}
                </>
              ) : (

                <tr>
                  <td colSpan="5">
                    TODOを入力してください。
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>

      </section>
      <MyMemo />
    </div>
  )
}



export default App;
