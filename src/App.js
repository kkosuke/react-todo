import React, {useState, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components"
import {Rule} from "./components/Rule";
import {Todo} from "./components/Todo";
import {TodoStatus} from "./constants/TodoStatus";

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
                  <td><input type="text" value={newTodo.title} onChange={onTodoInputChange} /></td>
                </tr>
                <tr>
                  <th>詳細</th>
                  <td><textarea onChange={onTodoDetailTextareaChange} value={newTodo.detail}></textarea></td>
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
    </div>
  )
}



export default App;
