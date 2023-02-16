import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

import { TODO_STATUS } from "./constants/Index";
import { dateFormat, filterDateSetting } from "./function/Index";
import {
  todoType,
  deadlineType,
  todoStatusType,
  sortOderValueType,
} from "./types/Index";

import { MyMemo } from "./components/MyMemo";
import { Todo } from "./components/Todo";
import { FilterByStatus } from "./components/FilterByStatus";
import { FilterByID } from "./components/FilterByID";
import { TodoDeadlineInput } from "./components/TodoDeadlineInput";
import { FilterByDate } from "./components/FilterByDate";
import { SortButton } from "./components/SortButton";

const App = () => {
  const FORM_INPUT_CLASS_NAME =
    "block bg-white w-full border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";
  const DEFAULT_DEADLINE: Date = (function (date) {
    date.setDate(date.getDate() + 7); // 1週間後
    date.setMinutes(0); // 初期期限の分は0にしたい
    return new Date(date);
  })(new Date());
  const INIT_TODO: todoType = {
    id: "",
    status: "notStarted",
    title: "",
    detail: "",
    createdAt: new Date(),
    updateAt: new Date(),
    deadline: DEFAULT_DEADLINE,
  };
  // const DEADLINE_KEYS = ["year", "month", "date", "hours", "minutes"] as const;
  const DEADLINE_KEYS: readonly deadlineType[] = [
    "year",
    "month",
    "date",
    "hours",
    "minutes",
  ];
  // 並び順の初期値
  const INIT_SORT_ODER: {
    [key: string]: sortOderValueType;
  } = {
    createdAt: "asc",
    id: "none",
    deadline: "none",
  };
  // それぞれが、どんな順で並んでいるかよりも、
  // 何がどんな順で並んでいるかで制御したほうが、参照する楽なのかもしれない。。
  // ---
  // const INIT_SORT_ODER: {
  //   name: "createdAt" | "id" | "deadline";
  //   oder: "asc" | "desc";
  // } = {
  //   name: "createdAt",
  //   oder: "asc",
  // };
  // ---

  // TODOの本体
  const [todoList, setTodoList] = useState(() =>
    localStorage.getItem("todoList")
      ? JSON.parse(localStorage.getItem("todoList") || "")
      : []
  );
  // 表示用のTODO
  const [currentList, setCurrentList] = useState(todoList);
  const [newTodo, setNewTodo] = useState(INIT_TODO);
  // 編集中TODO
  const [currentTodo, setCurrentTodo] = useState(INIT_TODO);

  const [filterStatusValue, setFilterStatusValue] =
    useState<todoStatusType>("");
  const [filterIdValue, setFilterIdValue] = useState("");
  const [filterDateValues, setFilterDateValues] = useState([
    filterDateSetting(new Date(), 0),
    filterDateSetting(DEFAULT_DEADLINE, 1),
  ]);
  const [sortOder, setSortOder] = useState(INIT_SORT_ODER);
  const [isEditing, setIsEditing] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  //-----------------------------
  // 新規のTODO作成時
  //-----------------------------
  const onTodoStatusChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewTodo({ ...newTodo, status: event.target.value as todoStatusType });
  const onTodoInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewTodo({
      ...newTodo,
      title: event.target.value,
    });
  const onTodoDetailTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) =>
    setNewTodo({
      ...newTodo,
      detail: event.target.value,
    });
  const onTodoDeadlineInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    deadlineType: deadlineType
  ) =>
    setNewTodo({
      ...newTodo,
      deadline: generateDeadline(
        new Date(newTodo.deadline),
        deadlineType,
        Number(event.target.value)
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
      setNewTodo(INIT_TODO);
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
    setCurrentTodo({ ...INIT_TODO, ...todo }); // 初期のデータからの場合、期限などがない場合があるので初期値に上書き
  };
  // 編集のキャンセル
  const onClickEditCancel = () => setIsEditing(false);

  const onEditTodoStatus = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentTodo({
      ...currentTodo,
      status: event.target.value as todoStatusType,
    });
  const onEditTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentTodo({ ...currentTodo, title: event.target.value });
  const onEditTodoTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setCurrentTodo({ ...currentTodo, detail: event.target.value });
  const onEditTodoDeadline = (
    event: React.ChangeEvent<HTMLInputElement>,
    deadlineType: deadlineType
  ) =>
    setCurrentTodo({
      ...currentTodo,
      deadline: generateDeadline(
        new Date(currentTodo.deadline),
        deadlineType,
        Number(event.target.value)
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
  };
  // ID絞り込みinput操作時
  const onFilterInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 参考：https://qiita.com/takf-jp/items/af10bc05428b1182ece5
    const text = event.target.value.trim().match(/[^\s]+/g);
    const newFilterIdValue = text ? text[0] : "";
    setFilterIdValue(newFilterIdValue);
  };
  // 日にちで絞り込み押下時
  const onFilterDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const thisValue = event.target.value;
    const newFilterDateValues = filterDateValues;
    const y = Number(thisValue.split("-")[0]);
    const m = Number(thisValue.split("-")[1]) - 1; // htmlには正しい月数。しかしjsは-1しなくてはいけない
    const d = Number(thisValue.split("-")[2]);
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
    let newSortOder = INIT_SORT_ODER;
    if (type !== "createdAt") {
      newSortOder.createdAt = "none";
    }
    newSortOder[type] = sortOder[type] === "desc" ? "asc" : "desc";
    setSortOder(newSortOder);
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
    setIsFiltering(filterStatusValue !== "" || filterIdValue !== "");

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

    const sortKey = Object.keys(sortOder).find(
      (key) => sortOder[key] !== "none"
    ) as keyof todoType;
    newCurrentList.sort(function (a: todoType, b: todoType) {
      if (sortOder[sortKey] === "asc") {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      } else {
        return a[sortKey] > b[sortKey] ? -1 : 1;
      }
    });
    setCurrentList(newCurrentList);
  }, [todoList, filterStatusValue, filterIdValue, filterDateValues, sortOder]);

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
                    {Object.keys(TODO_STATUS).map((key: string) => (
                      <label key={key} className="mr-2 cursor-pointer">
                        <input
                          type="radio"
                          name="TodoStatus"
                          value={key}
                          onChange={onEditTodoStatus}
                          checked={key === currentTodo.status}
                        />
                        {TODO_STATUS[key]}
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
                      className={FORM_INPUT_CLASS_NAME}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="bg-gray-100">内容</th>
                  <td className="p-2">
                    <textarea
                      onChange={onEditTodoTextarea}
                      value={currentTodo.detail}
                      className={FORM_INPUT_CLASS_NAME}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <th className="bg-gray-100">期限</th>
                  <td className="p-2">
                    {DEADLINE_KEYS.map((keyValue: deadlineType) => (
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
                    {Object.keys(TODO_STATUS).map((key: string) => (
                      <label key={key} className="mr-2 cursor-pointer">
                        <input
                          type="radio"
                          name="TodoStatus"
                          value={key}
                          onChange={onTodoStatusChange}
                          checked={key === newTodo.status}
                        />
                        {TODO_STATUS[key]}
                      </label>
                    ))}
                  </td>
                </tr>
                <tr>
                  <th className="bg-gray-100">タイトル</th>
                  <td className="p-2">
                    <label className="relative block">
                      <input
                        className={FORM_INPUT_CLASS_NAME}
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
                      className={FORM_INPUT_CLASS_NAME}
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
                      {DEADLINE_KEYS.map((keyValue: deadlineType) => (
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
      />
      <FilterByDate
        onInputChange={onFilterDateChange}
        filterDateValues={filterDateValues}
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
                    sortOder={sortOder}
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
                    sortOder={sortOder}
                    onClickButton={onClickSort}
                  />
                </th>
                <th className="px-3.5 py-2">
                  <SortButton
                    labelName="作成"
                    typeName="createdAt"
                    sortOder={sortOder}
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
                    {todoList.length ? (
                      <>
                        <p>絞り込み条件に一致するTODOはありません。</p>

                        <dl className="mt-4">
                          <dt>▼▼▼検索条件▼▼▼</dt>
                          <dd>
                            <ul>
                              <li>
                                {filterStatusValue &&
                                  `ステータス：「${TODO_STATUS[filterStatusValue]}`}
                              </li>
                              <li>
                                {filterIdValue.length > 0 &&
                                  `IDに「${filterIdValue}」を含む`}
                              </li>
                              <li>
                                期限：
                                {dateFormat(filterDateValues[0])}〜
                                {dateFormat(filterDateValues[1])}
                              </li>
                            </ul>
                          </dd>
                        </dl>
                      </>
                    ) : (
                      <>TODOを作成してください。</>
                    )}
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
