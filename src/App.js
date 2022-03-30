import {  useState } from "react";
import "./App.css";
import Form from "./Componts/Form";
import Todos from "./Componts/Todos";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todolist, setTodoList] = useState([]);

  //..............Adding data.............  
  const addTodo = (todoitem) => {
    setTodoList([
      ...todolist,
      { id: uuidv4(), name: todoitem, isCompleted: false },
    ]);
  };

  // ............setting task completed/not completed............
  const toggleComplete = (id, checked) => {
    const newData = todolist.map((data) =>
      data.id === id ? { ...data, isCompleted: checked } : data
    );
    console.log(newData);
    setTodoList(newData);
  };

  // ........edit task continue..........

  const editTodo = (id, data) => {
    const editTodo = todolist.map((singletodo) => {
      if (singletodo.id === id) {
        return { ...singletodo, name: data };
      } else {
        return singletodo;
      }
    });
    setTodoList(editTodo);
  };

  //............remove Data.............
  const removeTodo = (id) => {
    if (window.confirm("Delete the item?")) {
      const temptArray = todolist.filter((singleTodo) => singleTodo.id !== id);
      setTodoList(temptArray);
    }
  };

  // .........Clear All............
  const clearAllHandler = () => {
    setTodoList([]);
  };

  return (
    <div className="wrapper">
      <header>Todo App</header>
      <Form addTodo={addTodo} />
      <Todos
        todolist={todolist}
        removeTodo={removeTodo}
        toggleComplete={toggleComplete}
        editTodo={editTodo}
      />
      {todolist.length !== 0 && (
        <div className="footer">
          <span>
            You have{" "}
            <span className="pendingTasks">
              {todolist.length !== 0
                ? todolist.filter((singleData) => !singleData.isCompleted)
                    .length
                : 0}
            </span>{" "}
            pending tasks
          </span>
          <button onClick={clearAllHandler}>Clear All</button>
        </div>
      )}
    </div>
  );
}

export default App;
