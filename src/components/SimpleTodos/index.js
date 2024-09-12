import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TodoItem from '../TodoItem'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
    isChecked: false,
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
    isChecked: false,
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    isChecked: false,
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
    isChecked: false,
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
    isChecked: false,
  },
  {
    id: 6,
    title: 'Fix the production issue',
    isChecked: false,
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
    isChecked: false,
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
    isChecked: false,
  },
]

class SimpleTodos extends Component {
  state = {
    todoList: [], // Start with an empty list
    inputData: '',
  }

  componentDidMount() {
    // Load todo list from local storage
    const savedTodos = JSON.parse(localStorage.getItem('todoList'))
    if (savedTodos) {
      this.setState({todoList: savedTodos})
    } else {
      // Initialize local storage with default todos if empty
      localStorage.setItem('todoList', JSON.stringify(initialTodosList))
      this.setState({todoList: initialTodosList})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Update local storage whenever the todo list changes
    if (prevState.todoList !== this.state.todoList) {
      localStorage.setItem('todoList', JSON.stringify(this.state.todoList))
    }
  }

  deleteTodo = todoId => {
    const {todoList} = this.state
    const filteredTodoList = todoList.filter(each => each.id !== todoId)
    this.setState({
      todoList: filteredTodoList,
    })
  }

  onChangeInput = event => {
    this.setState({inputData: event.target.value})
  }

  onAddNewTask = () => {
    const {inputData} = this.state
    // Regular expression to match a number at the end of the input
    const match = inputData.match(/(\d+)$/)
    const numberOfTasks = match ? parseInt(match[1], 10) : 1
    const taskTitle = inputData.replace(/(\d+)$/, '').trim()

    // Generate new tasks
    const newTasks = Array.from({length: numberOfTasks}, () => ({
      id: uuidv4(),
      title: taskTitle,
      isChecked: false,
    }))

    this.setState(prev => ({
      todoList: [...prev.todoList, ...newTasks],
      inputData: '',
    }))
  }

  onSaveExitingTask = (id, taskTitle) => {
    const {todoList} = this.state
    const newUpdatedList = todoList.map(each => {
      if (each.id === id) {
        return {...each, title: taskTitle}
      } else {
        return each
      }
    })
    this.setState({todoList: newUpdatedList})
  }

  toggleTaskCompletion = id => {
    const {todoList} = this.state
    const updatedTodoList = todoList.map(each => {
      if (each.id === id) {
        return {...each, isChecked: !each.isChecked}
      }
      return each
    })
    this.setState({todoList: updatedTodoList})
  }

  render() {
    const {todoList, inputData} = this.state
    return (
      <div className="bg-container">
        <div className="todo-card">
          <h1 className="heading">Simple Todos</h1>
          <div className="input-div-container">
            <input
              type="text"
              className="input"
              placeholder="Add Task"
              value={inputData}
              onChange={this.onChangeInput}
            />
            <button onClick={this.onAddNewTask} className="add-task-btn">
              Add
            </button>
          </div>
          <ul className="todo">
            {todoList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoList={eachTodo}
                onEditedTask={this.onSaveExitingTask}
                deleteTodo={this.deleteTodo}
                toggleTaskCompletion={this.toggleTaskCompletion}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
