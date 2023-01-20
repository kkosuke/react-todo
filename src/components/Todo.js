import styled, {css} from "styled-components"
import {TodoStatus} from "../constants/TodoStatus";

const SButtonMixin = css`
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  padding: 4px 8px;
  cursor: pointer;
  user-select: none;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: #212529;
  border-radius: 0.5rem;
`

const SEditButton = styled.button`
  ${SButtonMixin}
  margin-right: 8px;
`
const SDeleteButton = styled.button`
${SButtonMixin}
`

const STodoItem = styled.li`
  ${props => props.Done === true && css`
    opacity: 0.2;
  `}
`
export const Todo = (props) =>{
  return (
    <STodoItem Done={props.todo.status === 2}>
      <dl>
        <dt>ID</dt>
        <dd>{props.todo.id}</dd>
        <dt>ステータス</dt>
        <dd>{TodoStatus[props.todo.status]}</dd>
        <dt>タイトル</dt>
        <dd>{props.todo.title}</dd>
        <dt>詳細</dt>
        <dd>{props.todo.detail}</dd>
      </dl>
      <SEditButton onClick={() => props.onClickEdit(props.todo)}>編集</SEditButton>
      <SDeleteButton onClick={() => props.onClickDelete(props.todo.id)}>削除</SDeleteButton>
    </STodoItem>
  )
}