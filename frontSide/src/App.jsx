import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { addTodos, deleteTodos, fetchTodos, saveTodos } from './features/todoSlice'
function App() {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const todos = useSelector((state)=> state.todos)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])
  
  const handleDelete = (id) => {
    dispatch(deleteTodos(id))
  }
  const handleAdd = (text) => {
    dispatch(addTodos(text))
    setText('')
  }
  const handleSave = (id, completed) => {
    dispatch(saveTodos({id, completed}))
  }
  
  return (
    <div>
      <input 
      type="text" 
      value={text}
      onChange = {(e) => setText(e.target.value)}
      />
      <button onClick={() => {handleAdd(text)}}>add</button>      <ul>
        {todos.map(item => 
        <li> <input type="checkbox" checked={item.completed} onChange={() => handleSave(item._id, item.completed)}/> 
        {item.title} <button onClick={() => handleDelete(item._id)}>X</button></li>) }
      </ul>
    </div>
  )
}

export default App
