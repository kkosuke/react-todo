import React, {useState, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components"
import {Rule} from "./components/Rule";
import {Todo} from "./components/Todo";
import {TodoStatus} from "./constants/TodoStatus";

const SLabel = styled.label`
  cursor: pointer;
`
const App = () =>{
  const [todoList, setTodoList] = useState(() => localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")): []);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDetail, setNewTodoDetail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const onTodoInputChange = event => setNewTodoTitle(event.target.value);
  const onTodoDetailTextareaChange = event => setNewTodoDetail(event.target.value)
  const onTodoSubmit = event => {
    event.preventDefault();
    if (newTodoTitle.trim()){
      const newTodo = {
        id: uuidv4(),
        status: "notStarted",
        title: newTodoTitle.trim(),
        detail: newTodoDetail.trim(),
      }
      console.log(newTodo);
      setTodoList([...todoList,newTodo]);
      setNewTodoTitle("");
      setNewTodoDetail("");
    } else {
      alert('TODOを入力してください');
    }
  }
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  // 押下したTODO以外を残す
  const onClickDelete = (id) => {
    console.log(todoList);
    const removeItem = todoList.filter((todo) => {
      return todo.id !== id;
    });
    setTodoList(removeItem);
  }
  const onClickEdit = (todo) =>{
    setIsEditing(true);
    setCurrentTodo(todo);
  }
  const onEditTodoStatus = event => {
    const thisTodo = {...currentTodo, ...{status:event.target.value}}
    setCurrentTodo(thisTodo);
  }
  const onEditSubmit = event => {
    event.preventDefault();
    const updatedItem = todoList.map((todo) => {
      return todo.id === currentTodo.id ? currentTodo : todo;
    });
    setIsEditing(false);
    setTodoList(updatedItem);
  }
  return (
    <div className="" style={{
      margin: "20px"
    }}>
      <h1>TODOs</h1>
      {
        isEditing ? (
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
                  <td><input type="text" value={currentTodo.title} onChange={onTodoInputChange} /></td>
                </tr>
                <tr>
                  <th>詳細</th>
                  <td><textarea onChange={onTodoDetailTextareaChange} value={currentTodo.detail}></textarea></td>
                </tr>
                <tr>
                  <th>&nbsp;</th>
                  <td><button type="submit">更新</button></td>
                </tr>
              </tbody>
            </table>
          </form>
        ) : (
          <form onSubmit={onTodoSubmit}>
            <table>
              <tbody>
                <tr>
                  <th>タイトル</th>
                  <td><input type="text" value={newTodoTitle} onChange={onTodoInputChange} /></td>
                </tr>
                <tr>
                  <th>詳細</th>
                  <td><textarea onChange={onTodoDetailTextareaChange} value={newTodoDetail}></textarea></td>
                </tr>
                <tr>
                  <th>&nbsp;</th>
                  <td><button type="submit">追加</button></td>
                </tr>
              </tbody>
            </table>
          </form>
        )
      }
      <section>
        <h2>あなたのTODO</h2>
        {todoList.length ? (
          <ul>
            {todoList.map((todo)=>(
              <Todo key={todo.id}
                todo={todo}
                onClickEdit={onClickEdit}
                onClickDelete={onClickDelete}
              />
            ))}
          </ul>
        ) : (
          <p>TODOを入力してください。</p>
        )}
      </section>

      <Rule />

      <section>
        <h2>やれたらいいな</h2>
        <ul>
          <li>todoの項目を用意に増やせるようになる</li>
          <li>todoの編集のキャンセル</li>
          <li>todoリストのその場で修正</li>
          <li>並び替え</li>
          <li>絞り込み検索（完全一致、含む、あいまい）</li>
          <li>csvエクスポート ダウンロード、インポート</li>
        </ul>
      </section>
    </div>
  )
}



export default App;
