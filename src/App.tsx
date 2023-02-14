import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

import { TodoStatus } from "./constants/TodoStatus";
import { filterDateSetting } from "./function/Index";

import { MyMemo } from "./components/MyMemo";
import { Todo } from "./components/Todo";
import { FilterByStatus } from "./components/FilterByStatus";
import { FilterByID } from "./components/FilterByID";
import { TodoDeadlineInput } from "./components/TodoDeadlineInput";
import { FilterByDate } from "./components/FilterByDate";
import { SortButton } from "./components/SortButton";

const App = () => {
  type deadlineType = "year" | "month" | "date" | "hours" | "minutes";
  type todoStatusType = "" | "notStarted" | "doing" | "done";
  type todoType = {
    id: string;
    status: todoStatusType;
    title: string;
    detail: string;
    createdAt: Date;
    updateAt: Date;
    deadline: Date;
  };
  type sortValueType = {
    [key: string]: "none" | "desc" | "asc";
  };

  const inputClassName =
    "block bg-white w-full border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";
  const deadlineKeys = ["year", "month", "date", "hours", "minutes"] as const;
  let defaultDeadlineEnd = new Date();
  defaultDeadlineEnd.setDate(defaultDeadlineEnd.getDate() + 7);
  defaultDeadlineEnd.setMinutes(0); // 初期期限の分は0にしたい

  const initTodo: todoType = {
    id: "",
    status: "notStarted",
    title: "",
    detail: "",
    createdAt: new Date(),
    updateAt: new Date(),
    deadline: new Date(defaultDeadlineEnd),
  };
  const initSortValue: sortValueType = {
    createdAt: "asc",
    id: "none",
    deadline: "none",
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
  // 時間まで分秒刻みで設定されるので、不都合がある…
  const [filterDateValues, setFilterDateValues] = useState([
    filterDateSetting(new Date(), 0),
    filterDateSetting(new Date(defaultDeadlineEnd), 1),
  ]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [sortValue, setSortValue] = useState(initSortValue);

  //-----------------------------
  // 新規のTODO作成時
  //-----------------------------
  const onTodoStatusChange = (event: any) =>
    setNewTodo({ ...newTodo, status: event.target.value });
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
        createdAt: new Date(),
      };
      setTodoList([...todoList, _newTodo]);
      setNewTodo(initTodo);
    } else {
      alert("TODOを入力してください");
    }
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
  // TODOの編集時
  //-----------------------------
  const onClickEdit = (todo: todoType) => {
    setIsEditing(true);
    setCurrentTodo({ ...initTodo, ...todo }); // 初期のデータからの場合、期限などがない場合があるので初期値に上書き
  };
  // 編集のキャンセル
  const onClickEditCancel = () => setIsEditing(false);

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
    const newCurrentTodo = {
      ...currentTodo,
      updateAt: new Date(),
    };
    const updatedItem = todoList.map((todo: todoType) =>
      todo.id === currentTodo.id ? newCurrentTodo : todo
    );
    setIsEditing(false);
    setCurrentTodo(newCurrentTodo);
    setTodoList(updatedItem);
  };

  //-----------------------------
  // 絞り込み
  //-----------------------------
  // ステータスで絞り込むボタン押下時
  const onFilterButtonClick = (status: todoStatusType) => {
    const newFilterStatusValue = status.length ? status : "";
    setFilterStatusValue(newFilterStatusValue);
    setIsFiltering(newFilterStatusValue !== "");
  };
  // ID絞り込みinput操作時
  const onFilterInputChange = (event: any) => {
    // 参考：https://qiita.com/takf-jp/items/af10bc05428b1182ece5
    const newFilterIdValue = event.target.value.length
      ? event.target.value.trim().match(/[^\s]+/g)[0]
      : "";
    setFilterIdValue(newFilterIdValue);
    setIsFiltering(newFilterIdValue !== "");
  };
  // 日にちで絞り込み押下時
  const onFilterDateChange = (event: any, idx: number) => {
    const thisValue = event.target.value;
    const newFilterDateValues = filterDateValues;
    const y = thisValue.split("-")[0];
    const m = Number(thisValue.split("-")[1]) - 1; // htmlには正しい月数。しかしjsは-1しなくてはいけない
    const d = thisValue.split("-")[2];
    newFilterDateValues[idx].setFullYear(y);
    newFilterDateValues[idx].setMonth(m);
    newFilterDateValues[idx].setDate(d);
    if (idx === 0) {
      setFilterDateValues([
        filterDateSetting(new Date(newFilterDateValues[0]), 0),
        filterDateSetting(new Date(filterDateValues[1]), 1),
      ]);
    } else {
      setFilterDateValues([
        filterDateSetting(new Date(filterDateValues[0]), 0),
        filterDateSetting(new Date(newFilterDateValues[1]), 1),
      ]);
    }
  };

  // ソートボタン押下
  const onClickSort = (type: string) => {
    let newSortValue = initSortValue;
    if (type !== "createdAt") {
      newSortValue.createdAt = "none";
    }
    newSortValue[type] = sortValue[type] === "desc" ? "asc" : "desc";
    setSortValue(newSortValue);
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
        deadlineDate.setMonth(updateValue); // jsで受け取り、jsで返すので+-などはしない
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
    let newCurrentList = todoList;
    localStorage.setItem("todoList", JSON.stringify(todoList));

    // ステータスで絞り込み
    newCurrentList = !filterStatusValue
      ? newCurrentList
      : newCurrentList.filter(
          (todo: todoType) => todo.status === filterStatusValue
        );

    // IDで絞り込み
    newCurrentList = !filterIdValue
      ? newCurrentList
      : newCurrentList.filter(
          (todo: todoType) =>
            todo.id.toLowerCase().indexOf(filterIdValue.toLowerCase()) !== -1
        );

    // 日にちで絞り込み
    newCurrentList = newCurrentList.filter((todo: todoType) => {
      if (todo.deadline) {
        return (
          new Date(todo.deadline) >= new Date(filterDateValues[0]) &&
          new Date(filterDateValues[1]) >= new Date(todo.deadline)
        );
      } else {
        return true;
      }
    });

    const sortKey: string = Object.keys(sortValue).filter((key) => {
      return sortValue[key] !== "none";
    })[0];
    newCurrentList.sort(function (a: todoType, b: todoType) {
      if (sortValue[sortKey] === "asc") {
        //@ts-ignore
        return a[sortKey] > b[sortKey] ? 1 : -1;
      } else {
        //@ts-ignore
        return a[sortKey] > b[sortKey] ? -1 : 1;
      }
    });
    setCurrentList(newCurrentList);
  }, [todoList, filterStatusValue, filterIdValue, filterDateValues, sortValue]);

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
          <form
            onSubmit={onEditSubmit}
            className="overflow-hidden bg-white border border-slate-300 sm:rounded-lg"
          >
            <table className="w-full">
              <tbody>
                <tr>
                  <th className="bg-gray-100">ステータス</th>
                  <td className="p-2">
                    {Object.keys(TodoStatus).map((key: string) => (
                      <label key={key} className="mr-2 cursor-pointer">
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
                  <th className="bg-gray-100">タイトル</th>
                  <td className="p-2">
                    <input
                      type="text"
                      value={currentTodo.title}
                      onChange={onEditTodoTitle}
                      className={inputClassName}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="bg-gray-100">内容</th>
                  <td className="p-2">
                    <textarea
                      onChange={onEditTodoTextarea}
                      value={currentTodo.detail}
                      className={inputClassName}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <th className="bg-gray-100">期限</th>
                  <td className="p-2">
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
                  <th className="bg-gray-100">&nbsp;</th>
                  <td className="p-2">
                    <button
                      type="submit"
                      className="w-60 rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      TODOを更新
                    </button>
                    <button
                      type="button"
                      className="ml-4 px-3.5 py-1.5 text-base font-semibold leading-7 text-indigo-600 hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={onClickEditCancel}
                    >
                      キャンセル
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
          <form
            onSubmit={onTodoSubmit}
            className="overflow-hidden bg-white border border-slate-300 sm:rounded-lg"
          >
            <table className="w-full">
              <tbody>
                <tr>
                  <th className="bg-gray-100">ステータス</th>
                  <td className="p-2">
                    {Object.keys(TodoStatus).map((key: string) => (
                      <label key={key} className="mr-2 cursor-pointer">
                        <input
                          type="radio"
                          name="TodoStatus"
                          value={key}
                          onChange={onTodoStatusChange}
                          checked={key === newTodo.status}
                        />
                        {TodoStatus[key]}
                      </label>
                    ))}
                  </td>
                </tr>
                <tr>
                  <th className="bg-gray-100">タイトル</th>
                  <td className="p-2">
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
                  <th className="bg-gray-100">内容</th>
                  <td className="p-2">
                    <textarea
                      onChange={onTodoDetailTextareaChange}
                      value={newTodo.detail}
                      className={inputClassName}
                      placeholder="詳細情報を入力してください（省略化）"
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <th className="bg-gray-100">
                    <div>期限</div>
                    <span className="ml-2 text-xs font-normal">
                      初期値:1週間後
                    </span>
                  </th>
                  <td className="py-2">
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
                  <th className="bg-gray-100">&nbsp;</th>
                  <td className="p-2">
                    <button
                      type="submit"
                      className="w-60 rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
      <h2 className="text-2xl mb-4">
        TODO一覧　
        <span className="text-lg">
          全{todoList.length}件中 {currentList.length}件表示中
        </span>
      </h2>
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

      <section className="mt-5">
        <div className="overflow-hidden bg-white border border-slate-300 sm:rounded-lg">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3.5 py-2">
                  <SortButton
                    labelName="ID"
                    typeName="id"
                    sortValue={sortValue}
                    onClickButton={onClickSort}
                  />
                </th>
                <th className="px-3.5 py-2">ステータス</th>
                <th className="px-3.5 py-2">タイトル</th>
                <th className="px-3.5 py-2">内容</th>
                <th className="px-3.5 py-2">
                  <SortButton
                    labelName="期限"
                    typeName="deadline"
                    sortValue={sortValue}
                    onClickButton={onClickSort}
                  />
                </th>
                <th className="px-3.5 py-2">
                  <SortButton
                    labelName="作成"
                    typeName="createdAt"
                    sortValue={sortValue}
                    onClickButton={onClickSort}
                  />
                </th>
                <th className="px-3.5 py-2">更新</th>
                <th className="px-3.5 py-2"></th>
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
                  <td colSpan={8} className="px-4 py-5 sm:px-6 text-center">
                    {isFiltering
                      ? `${TodoStatus[filterStatusValue]}のTODOはありません。`
                      : "TODOを入力してください。"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <MyMemo />
    </div>
  );
};

export default App;
