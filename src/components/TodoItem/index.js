import './index.css'

const TodoItem = props => {
  const {todoDetails, deleteTodo} = props
  const {id, title} = todoDetails
  const onDelete = () => {
    deleteTodo(id)
  }
  return (
    <li className="user-card-container">
      <div className="user-details-container">
        <p className="user-designation"> {title} </p>
      </div>
      <button className="delete-button" onClick={onDelete}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
