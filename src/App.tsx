import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

import { TodoStatus } from "./constants/TodoStatus";
import { MyMemo } from "./components/MyMemo";
import { Todo } from "./components/Todo";
import { FilterByStatus } from "./components/FilterByStatus";
import { FilterByID } from "./components/FilterByID";
import { TodoDeadlineInput } from "./components/TodoDeadlineInput";
import { FilterByDate } from "./components/FilterByDate";

const App = () => {
  type deadlineType = "year" | "month" | "date" | "hours" | "minutes";
  type todoStatusType = "" | "notStarted" | "doing" | "done";
  type todoType = {
    id: string;
    status: todoStatusType;
    title: string;
    detail: string;
    deadline: Date;
  };

  const inputClassName =
    "block bg-white w-full border ml-2 border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";
  const deadlineKeys = ["year", "month", "date", "hours", "minutes"] as const;
  let defaultDeadlineEnd = new Date();
  defaultDeadlineEnd.setDate(defaultDeadlineEnd.getDate() + 7);
  defaultDeadlineEnd.setMinutes(0);
  defaultDeadlineEnd = new Date(defaultDeadlineEnd);
  const initTodo: todoType = {
    id: "",
    status: "",
    title: "",
    detail: "",
    deadline: defaultDeadlineEnd,
  };

  const [todoList, setTodoList] = useState(() =>
    localStorage.getItem("todoList")
      ? JSON.parse(localStorage.getItem("todoList") || "")
      : []
  );
  const [newTodo, setNewTodo] = useState(initTodo);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(initTodo);
  const [currentList, setCurrentList] = useState(todoList);
  const [filterStatusValue, setFilterStatusValue] =
    useState<todoStatusType>("");
  // ID名でフィルター
  const [filterIdValue, setFilterIdValue] = useState("");
  // 日にちでフィルター
  const [filterDateValues, setFilterDateValues] = useState([
    new Date(),
    defaultDeadlineEnd,
  ]);
  const [isFiltering, setIsFiltering] = useState(false);

  //-----------------------------
  // 新規のTODO作成時
  //-----------------------------
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
  const onTodoDeadlineInputChange = (event: any, deadlineType: deadlineType) =>
    setNewTodo({
      ...newTodo,
      deadline: generateDeadline(
        new Date(newTodo.deadline),
        deadlineType,
        event.target.value
      ),
    });
  const onTodoSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newTodo.title.trim()) {
      const _newTodo = {
        ...newTodo,
        id: uuidv4(),
        status: "notStarted",
      };
      setTodoList([...todoList, _newTodo]);
      setNewTodo(initTodo);
    } else {
      alert("TODOを入力してください");
    }
  };

  //-----------------------------
  // TODOの編集時
  //-----------------------------
  const onClickEdit = (todo: todoType) => {
    setIsEditing(true);
    setCurrentTodo({ ...initTodo, ...todo }); // 初期のデータからの場合、期限などがない場合がある
  };
  const onEditTodoStatus = (event: any) =>
    setCurrentTodo({ ...currentTodo, status: event.target.value });
  const onEditTodoTitle = (event: any) =>
    setCurrentTodo({ ...currentTodo, title: event.target.value });
  const onEditTodoTextarea = (event: any) =>
    setCurrentTodo({ ...currentTodo, detail: event.target.value });
  const onEditTodoDeadline = (event: any, deadlineType: deadlineType) =>
    setCurrentTodo({
      ...currentTodo,
      deadline: generateDeadline(
        new Date(currentTodo.deadline),
        deadlineType,
        event.target.value
      ),
    });
  // 編集完了ボタンを押下したら、操作中のidを既存のtodoと差し替える
  const onEditSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedItem = todoList.map((todo: todoType) =>
      todo.id === currentTodo.id ? currentTodo : todo
    );
    setIsEditing(false);
    setTodoList(updatedItem);
  };

  //-----------------------------
  // 絞り込み
  //-----------------------------
  // ステータスで絞り込むボタン押下時
  const onFilterButtonClick = (status: todoStatusType) => {
    const newFilterStatusValue = status.length ? status : "";
    const newCurrentList = !newFilterStatusValue
      ? todoList
      : todoList.filter(
          (todo: todoType) => todo.status === newFilterStatusValue
        );
    setFilterStatusValue(newFilterStatusValue);
    setCurrentList(newCurrentList);
    setIsFiltering(newFilterStatusValue !== "");
  };
  // ID絞り込みinput操作時
  const onFilterInputChange = (event: any) => {
    // 参考：https://qiita.com/takf-jp/items/af10bc05428b1182ece5
    const newFilterIdValue = event.target.value.length
      ? event.target.value.trim().match(/[^\s]+/g)[0]
      : "";
    const newCurrentList = !newFilterIdValue
      ? todoList
      : todoList.filter(
          (todo: todoType) =>
            todo.id.toLowerCase().indexOf(newFilterIdValue.toLowerCase()) !== -1
        );
    setFilterIdValue(newFilterIdValue);
    setCurrentList(newCurrentList);
    setIsFiltering(newFilterIdValue !== "");
  };
  // 日にちで絞り込み押下時
  const onFilterDateChange = (event: any, idx: number) => {
    const thisValue = event.target.value;
    const newFilterDateValues = filterDateValues;
    const y = thisValue.split("-")[0];
    const m = Number(thisValue.split("-")[1]) - 1;
    const d = thisValue.split("-")[2];
    newFilterDateValues[idx].setFullYear(y);
    newFilterDateValues[idx].setMonth(m);
    newFilterDateValues[idx].setDate(d);
    setFilterDateValues([
      new Date(newFilterDateValues[0]),
      new Date(filterDateValues[1]),
    ]);
  };

  //-----------------------------
  // 削除
  //-----------------------------
  const onClickDelete = (id: string) => {
    if (window.confirm("Do you really want to delete?")) {
      const removeItem = todoList.filter((todo: todoType) => todo.id !== id); // 押下したTODO以外を残す
      setTodoList(removeItem);
    }
  };

  //-----------------------------
  // 変換
  //-----------------------------
  const generateDeadline = (
    deadlineDate: Date,
    updateType: deadlineType,
    updateValue: number
  ) => {
    switch (updateType) {
      case "year":
        deadlineDate.setFullYear(updateValue);
        break;
      case "month":
        deadlineDate.setMonth(updateValue - 1);
        break;
      case "date":
        deadlineDate.setDate(updateValue);
        break;
      case "hours":
        deadlineDate.setHours(updateValue);
        break;
      case "minutes":
        deadlineDate.setMinutes(updateValue);
        break;
    }
    return new Date(deadlineDate);
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    onFilterButtonClick(filterStatusValue);
    const newCurrentList = todoList.filter((todo: todoType) => {
      if (todo.deadline) {
        return (
          new Date(todo.deadline) >= filterDateValues[0] &&
          new Date(todo.deadline) <= filterDateValues[1]
        );
      } else {
        return true;
      }
    });
    setCurrentList(newCurrentList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoList, filterDateValues]);

  return (
    <div
      className=""
      style={{
        margin: "20px",
      }}
    >
      <h1 className="text-4xl font-extrabold mb-4">TODO</h1>
      {isEditing ? (
        <>
          <h2 className="text-2xl mb-4">TODOを編集</h2>
          <form onSubmit={onEditSubmit}>
            <table>
              <tbody>
                <tr>
                  <th>ステータス</th>
                  <td>
                    {Object.keys(TodoStatus).map((key: string) => (
                      <label key={key}>
                        <input
                          type="radio"
                          name="TodoStatus"
                          value={key}
                          onChange={onEditTodoStatus}
                          checked={key === currentTodo.status}
                        />
                        {TodoStatus[key]}
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
                      onChange={onEditTodoTitle}
                      className={inputClassName}
                    />
                  </td>
                </tr>
                <tr>
                  <th>詳細</th>
                  <td>
                    <textarea
                      onChange={onEditTodoTextarea}
                      value={currentTodo.detail}
                      className={inputClassName}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <th>期限</th>
                  <td>
                    {deadlineKeys.map((keyValue: string) => (
                      <TodoDeadlineInput
                        key={keyValue}
                        inputValueType={keyValue}
                        todo={currentTodo}
                        onInputChange={onEditTodoDeadline}
                      />
                    ))}
                  </td>
                </tr>
                <tr>
                  <th>&nbsp;</th>
                  <td>
                    <button
                      type="submit"
                      className="mt-4 w-60 rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      TODOを更新
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </>
      ) : (
        <>
          <h2 className="text-2xl mb-4">新規TODOを追加</h2>

          <form onSubmit={onTodoSubmit}>
            <table>
              <tbody>
                <tr>
                  <th>ステータス</th>
                  <td>
                    <p>初期値:未着手</p>
                  </td>
                </tr>
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
                      placeholder="詳細情報を入力してください（省略化）"
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <th>期限</th>
                  <td>
                    <p>初期値:1週間後</p>
                    <div>
                      {deadlineKeys.map((keyValue: string) => (
                        <TodoDeadlineInput
                          key={keyValue}
                          inputValueType={keyValue}
                          todo={newTodo}
                          onInputChange={onTodoDeadlineInputChange}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>&nbsp;</th>
                  <td>
                    <button
                      type="submit"
                      className="mt-4 w-60 rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      新規追加
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </>
      )}

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

      <FilterByStatus
        onClickButton={onFilterButtonClick}
        filterStatusValue={filterStatusValue}
        isFiltering={isFiltering}
      />

      <FilterByID
        onInputChange={onFilterInputChange}
        filterIdValue={filterIdValue}
        isFiltering={isFiltering}
      />

      <FilterByDate
        isFiltering={isFiltering}
        filterDateValue={filterDateValues}
        onInputChange={onFilterDateChange}
      />

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

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
                  <th className="px-3.5 py-1.5">期限</th>
                  <th className="px-3.5 py-1.5">タイトル</th>
                  <th className="px-3.5 py-1.5">詳細</th>
                  <th className="px-3.5 py-1.5"></th>
                </tr>
              </thead>
              <tbody>
                {currentList.length ? (
                  <>
                    {currentList.map((todo: todoType) => (
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
                        ? `${TodoStatus[filterStatusValue]}のTODOはありません。`
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
