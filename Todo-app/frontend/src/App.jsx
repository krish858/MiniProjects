import React, { useEffect, useState } from "react";
import CreateTodo from "./components/CreateTodo";
import Todoslist from "./components/Todoslist";
import { RefreshContext } from "./components/context";

function App() {
  const [Todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(async function (res) {
        const json = await res.json();
        setTodos(json.todos);
      });
  }, [refresh]);

  const incrementRefresh = () => setRefresh(refresh + 1);

  return (
    <div className="m-2">
      <RefreshContext.Provider value={{ refresh, incrementRefresh }}>
        <CreateTodo />
        <Todoslist todos={Todos} />
      </RefreshContext.Provider>
    </div>
  );
}

export default App;
