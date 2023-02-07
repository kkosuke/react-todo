import React, { useState, useEffect } from "react";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { MyMemo } from "./components/MyMemo";
import { Todo } from "./components/Todo";
import { TodoStatus } from "./constants/TodoStatus";
import "./index.css";

const initTodo = {
  title: "",
  detail: "",
};

const buttonGroupButtonClassNameL =
  "px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white";
const buttonGroupButtonClassNameM =
  "px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white";
const buttonGroupButtonClassNameR =
  "px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white";

const App = () => {
  const [todoList, setTodoList] = useState(() =>
    localStorage.getItem("todoList")
      ? JSON.parse(localStorage.getItem("todoList") || "")
      : []
  );
  const [newTodo, setNewTodo] = useState<{
    title: string;
    detail: string;
  }>(initTodo);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<{
    id?: string;
    status?: string;
    title?: string;
    detail?: string;
  }>({});

  const onTodoInputChange = (event: any) =>
    setNewTodo({
      ...newTodo,
      title: event.target.value,
    });
  const onTodoDetailTextareaChange = (event: any) =>
    setNewTodo({
      ...newTodo,
      detail: event.target.value,
    });
  const onTodoSubmit = (event: any) => {
    event.preventDefault();
    if (newTodo.title.trim()) {
      const _newTodo = {
        id: uuidv4(),
        status: "notStarted",
        title: newTodo.title.trim(),
        detail: newTodo.detail.trim(),
      };
      setTodoList([...todoList, _newTodo]);
      setNewTodo(initTodo);
    } else {
      alert("TODOを入力してください");
    }
  };
  const sortTodo = (status: string) => {
    console.log("sortTodo", status);
  };
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  // 削除
  const onClickDelete = (id: number) => {
    // 押下したTODO以外を残す
    const removeItem = todoList.filter((todo: any) => todo.id !== id);
    setTodoList(removeItem);
  };
  const onClickEdit = (todo: any) => {
    setIsEditing(true);
    setCurrentTodo(todo);
  };
  const onEditTodoStatus = (event: any) => {
    const thisTodo = { ...currentTodo, status: event.target.value };
    setCurrentTodo(thisTodo);
  };
  const onEditSubmit = (event: any) => {
    event.preventDefault();
    const updatedItem = todoList.map((todo: any) =>
      todo.id === currentTodo.id ? currentTodo : todo
    );
    setIsEditing(false);
    setTodoList(updatedItem);
  };

  return (
    <div
      className=""
      style={{
        margin: "20px",
      }}
    >
      <h1>TODO</h1>
      {isEditing ? (
        <>
          <h2>新規TODOを編集</h2>
          <form onSubmit={onEditSubmit}>
            <table>
              <tbody>
                <tr>
                  <th>ステータス</th>
                  <td>
                    {Object.keys(TodoStatus).map((key) => (
                      <label key={key}>
                        <input
                          type="radio"
                          name="TodoStatus"
                          value={key}
                          onChange={onEditTodoStatus}
                          checked={key === currentTodo.status}
                        />
                        {
                          // @ts-ignore
                          TodoStatus[key]
                        }
                      </label>
                    ))}
                  </td>
                </tr>
                <tr>
                  <th>タイトル</th>
                  <td>
                    <input
                      type="text"
                      value={currentTodo.title}
                      onChange={onTodoInputChange}
                      className="block bg-white w-full border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    />
                  </td>
                </tr>
                <tr>
                  <th>詳細</th>
                  <td>
                    <textarea
                      onChange={onTodoDetailTextareaChange}
                      value={currentTodo.detail}
                      className="block bg-white w-full border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <th>&nbsp;</th>
                  <td>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      更新
                    </button>
                  </td>
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
                      <input
                        className="block bg-white w-full border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        placeholder="タイトルを入力"
                        type="text"
                        name="search"
                        value={newTodo.title}
                        onChange={onTodoInputChange}
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <th>詳細</th>
                  <td>
                    <textarea
                      onChange={onTodoDetailTextareaChange}
                      value={newTodo.detail}
                      className="block bg-white w-full border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                      placeholder="詳細情報を入力してください"
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <th>&nbsp;</th>
                  <td>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      追加
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </>
      )}

      <div className="inline-flex rounded-md shadow-sm mt-4" role="group">
        <button
          type="button"
          className={buttonGroupButtonClassNameL}
          onClick={() => sortTodo("notStarted")}
        >
          未着手
        </button>
        <button
          type="button"
          className={buttonGroupButtonClassNameM}
          onClick={() => sortTodo("doing")}
        >
          着手
        </button>
        <button
          type="button"
          className={buttonGroupButtonClassNameR}
          onClick={() => sortTodo("done")}
        >
          完了
        </button>
      </div>

      <section className="mt-5">
        <div className="overflow-hidden bg-white border border-slate-300 sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              TODO一覧
            </h2>
          </div>
          {todoList.length}
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
                    {todoList.map((todo: any) => (
                      <Todo
                        key={todo.id}
                        todo={todo}
                        onClickEdit={onClickEdit}
                        onClickDelete={onClickDelete}
                      />
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan={5}>TODOを入力してください。</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <MyMemo />
    </div>
  );
};

export default App;
