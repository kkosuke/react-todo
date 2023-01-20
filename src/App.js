import React, {useState, useEffect} from "react";
import Rule from "./components/Rule";
import Todo from "./components/Todo";
import TodoStatus from "./components/TodoStatus";

const App = () =>{
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDetail, setTodoDetail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  function onTodoInputChange(event){
    setTodoTitle(event.target.value)
  }
  function onTodoDetailTextareaChange(event){
    setTodoDetail(event.target.value)
  }
  function generateTodoId() {
    // 参考：https://qiita.com/t-yama-3/items/29bd686f2a8b3cb9e784
    const date = new Date();
    return date.getFullYear() + '' + date.getMonth() + 1 + '' + date.getDate() + '' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds()
  }
  function onTodoSubmit(event){
    event.preventDefault();
    if (todoTitle.trim()){
      const newTodo = {
        id: generateTodoId(),
        status: 0,
        title: todoTitle.trim(),
        detail: todoDetail.trim(),
      }
      console.log(newTodo);
      setTodos([...todos,newTodo]);
      setTodoTitle("");
      setTodoDetail("");
    } else {
      alert('TODOを入力してください');
    }
  }
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 押下したTODO以外を残す
  function onClickDelete(id){
    console.log(todos);
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }
  function onClickEdit(todo){
    setIsEditing(true);
    setCurrentTodo(todo);
  }
  function onEditTodoStatus(event) {
    const thisTodo = {...currentTodo, ...{status:Number(event.target.value)}}
    setCurrentTodo(thisTodo);
  }
  function onEditSubmit(event) {
    event.preventDefault();
    const updatedItem = todos.map((todo) => {
      return todo.id === currentTodo.id ? currentTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
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
                      <label key={key}>
                        <input type="radio" name="TodoStatus" value={key}
                        onChange={onEditTodoStatus}
                        checked={String(key) === String(currentTodo.status)} />
                        {TodoStatus[key]}
                      </label>
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
                  <td><input type="text" value={todoTitle} onChange={onTodoInputChange} /></td>
                </tr>
                <tr>
                  <th>詳細</th>
                  <td><textarea onChange={onTodoDetailTextareaChange} value={todoDetail}></textarea></td>
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
        {todos.length ? (
          <ul>
            {todos.map((todo)=>(
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