import React from "react"
import { useState } from "react";
import CreateTodo from "./components/CreateTodo"
import Todoslist from "./components/Todoslist"

function App() {
  const [Todos,setTodos] = useState([]);

  fetch("http://localhost:3000/todos")
    .then(async function(res){
      const json = await res.json();
      setTodos(json.todos);
    });
  return (
    <div className="m-2">
      <CreateTodo></CreateTodo>
      <Todoslist todos={Todos}/>
    </div>
  )
}

export default App
