import { useEffect, useState } from "react";
import "./App.css";
import Form from "./Componts/Form";
import Todos from "./Componts/Todos";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

function App() {
  const [todolist, setTodoList] = useState([]);

  const addTodo = (todoitem, date) => {
    setTodoList([...todolist, { id: uuidv4(), name: todoitem, date }]);
    localStorage.setItem(
      "Todos-list",
      JSON.stringify([...todolist, { id: uuidv4(), name: todoitem, date }])
    );
  };
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
        localStorage.setItem("Todos-list", JSON.stringify(temptArray));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const clearAllHandler = () => {
    setTodoList([]);
    localStorage.clear();
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
      <Todos todolist={todolist} removeTodo={removeTodo} />
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
