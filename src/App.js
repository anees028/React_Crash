import React, {useState, useRef, useEffect} from 'react';
import TodoList from './component/TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todo';

function App() {

  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  //let leftTodo = 0;

  //Loadigng from local storage..
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedTodos) {
      setTodos(storedTodos);
    }
  },[]) //by passing empty array it will only recall it once at start when component loads.)

  //Storing in the local storage..
  useEffect(() => {
    console.log("Local Storage ", todos)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function toggleTodo(id){
    const newTodos = [...todos];
    const todo = newTodos.find(t => t.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value;
    if(name === '') return;
    setTodos(prevTodo => {
      console.log("Previous Todo ", prevTodo)
      return [...prevTodo, {id:uuidv4(), name:name, complete: false}]
    })
    todoNameRef.current.value = null;
  }

  function clearTodos(){
    const newTodos = todos.filter(x => !x.complete)
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todoList={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type='text' />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={clearTodos}>Clear Complete</button>
      <div>{todos.filter(x => !x.complete).length} left to do</div>
    </>
  );
}

export default App;
