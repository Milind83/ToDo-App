import { useEffect, useState } from "react";
import "./App.css";
import Form from "./Componts/Form";
import Todos from "./Componts/Todos";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

function App() {
  const [todolist, setTodoList] = useState([]);

  //..............Adding data.............
  const addTodo = (todoitem, date) => {
    setTodoList([
      ...todolist,
      { id: uuidv4(), name: todoitem, date, isCompleted: false },
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

  const editTodo= (id) => {
      const editTodo = todolist.find((todolist)=>todolist.id === id);
      setTodoList(editTodo);
  };

  //............remove Data.............
  const removeTodo = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const temptArray = todolist.filter(
          (singleTodo) => singleTodo.id !== id
        );
        setTodoList(temptArray);
      }
    });
  };

  // .........Clear All............
  const clearAllHandler = () => {
    setTodoList([]);
  };

  useEffect(() => {
    const todoData = JSON.parse(localStorage.getItem("Todos-list"));
    if (todoData) {
      setTodoList(todoData);
      console.log(todoData);
    }
  }, []);
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
      <div className="footer">
        <span>
          You have <span className="pendingTasks">{todolist.length}</span>{" "}
          pending tasks
        </span>
        <button onClick={clearAllHandler}>Clear All</button>
      </div>
    </div>
  );
}

export default App;
