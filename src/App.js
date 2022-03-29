import { useEffect, useState } from "react";
import "./App.css";
import Form from "./Componts/Form";
import Todos from "./Componts/Todos";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

function App() {
  const [todolist, setTodoList] = useState([]);

  const addTodo = (todoitem, date) => {
    setTodoList([
      ...todolist,
      { id: uuidv4(), name: todoitem, date, isCompleted: false },
    ]);
    localStorage.setItem(
      "Todos-list",
      JSON.stringify([
        ...todolist,
        { id: uuidv4(), name: todoitem, date, isCompleted: false },
      ])
    );
  };
  // setting task completed/not completed
  const toggleComplete = (id, checked) => {
    const newData = todolist.map((data) =>
      data.id === id ? { ...data, isCompleted: checked } : data
    );
    console.log(newData);
    setTodoList(newData);
    localStorage.setItem("Todos-list", JSON.stringify(newData));
  };

  // edit task continue...
  const editTodo = (id) => {
    console.log(id);
    Swal.fire({
      title: "Edit ToDo",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Enter new todo name">' +
        '<input type="date" id="swal-input2" class="swal2-input placeholder="Enter new todo name"">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    }).then((res) => {
      console.log(res.value);
      const newData = todolist.map((data) =>
        data.id === id
          ? { ...data, name: res.value[0], date: res.value[1] }
          : data
      );
      console.log(newData);
      if (res.value[0] === "" || res.value[1] === "") {
        Swal.fire("Error!", "All fields are required", "error");
      } else {
        setTodoList(newData);
        localStorage.setItem("Todos-list", JSON.stringify(newData));
        Swal.fire("Edited!", "Your task is edited.", "success");
      }
    });
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
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
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
