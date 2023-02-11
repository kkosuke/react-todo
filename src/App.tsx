import React, { useState, useEffect } from "react";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import "./index.css";

import { TodoStatus } from "./constants/TodoStatus";
import { MyMemo } from "./components/MyMemo";
import { Todo } from "./components/Todo";
import { FilterByStatus } from "./components/FilterByStatus";
import { FilterByID } from "./components/FilterByID";

const inputClassName =
  "block bg-white w-full border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";

const initTodo: { title: string; detail: string } = {
  title: "",
  detail: "",
};

const App = () => {
  const [todoList, setTodoList] = useState(() =>
    localStorage.getItem("todoList")
      ? JSON.parse(localStorage.getItem("todoList") || "")
      : []
  );
  const [newTodo, setNewTodo] = useState(initTodo);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<{
    id?: string;
    status?: string;
    title?: string;
    detail?: string;
  }>({});
  const [currentList, setCurrentList] = useState(todoList);
  // ステータスでフィルター
  const todoStatusKeys = ["", "notStarted", "doing", "done"] as const;
  type todoStatusType = typeof todoStatusKeys[number];
  const [filterStatusValue, setFilterStatusValue] =
    useState<todoStatusType>("");
  // ID名でフィルター
  const [filterIdValue, setFilterIdValue] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

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

  // ID絞り込みinput操作時
  const onFilterInputChange = (event: any) => {
    const newFilterIdValue = event.target.value.length
      ? event.target.value.trim().match(/[^\s]+/g)[0]
      : "";
    const newCurrentList = !newFilterIdValue
      ? todoList
      : todoList.filter(
          (todo: any) =>
            todo.id.toLowerCase().indexOf(newFilterIdValue.toLowerCase()) !== -1
        );
    setFilterIdValue(newFilterIdValue);
    setCurrentList(newCurrentList);
    setIsFiltering(newFilterIdValue !== "");
  };

  // 絞り込みボタン押下時
  const onFilterButtonClick = (status: todoStatusType) => {
    const newFilterStatusValue = status.length ? status : "";
    const newCurrentList = !newFilterStatusValue
      ? todoList
      : todoList.filter((todo: any) => todo.status === newFilterStatusValue);
    setFilterStatusValue(newFilterStatusValue);
    setCurrentList(newCurrentList);
    setIsFiltering(newFilterStatusValue !== "");
  };
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

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    onFilterButtonClick(filterStatusValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoList]);

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
          <h2>TODOを編集</h2>
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
                      className={inputClassName}
                    />
                  </td>
                </tr>
                <tr>
                  <th>詳細</th>
                  <td>
                    <textarea
                      onChange={onTodoDetailTextareaChange}
                      value={currentTodo.detail}
                      className={inputClassName}
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
                        className={inputClassName}
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
                      className={inputClassName}
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

      <FilterByStatus
        onClickButton={onFilterButtonClick}
        filterStatusValue={filterStatusValue}
        isFiltering={isFiltering}
      />

      <FilterByID
        inputClassName={inputClassName}
        onInputChange={onFilterInputChange}
        filterIdValue={filterIdValue}
        isFiltering={isFiltering}
      />

      <section className="mt-5">
        <div className="overflow-hidden bg-white border border-slate-300 sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              TODO一覧 （ 絞り込み中？ : {isFiltering ? "true" : "false"}）
            </h2>
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
                {currentList.length ? (
                  <>
                    {currentList.map((todo: any) => (
                      <Todo
                        key={todo.id}
                        todo={todo}
                        onClickEdit={onClickEdit}
                        onClickDelete={onClickDelete}
                        filterStatusValue={filterStatusValue}
                      />
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-5 sm:px-6 text-center">
                      {isFiltering
                        ? // @ts-ignore
                          `${TodoStatus[filterStatusValue]}のTODOはありません。`
                        : "TODOを入力してください。"}
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
  );
};

export default App;
