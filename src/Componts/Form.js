import React, { useState } from "react";
import Swal from "sweetalert2";

function Form({ addTodo }) {
  const [todoitem, setTodoItem] = useState("");
  const [date, setDate] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (todoitem === "" || date === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All the fields are mandetory!",
        footer: "Click  &nbsp;<strong> OK </strong>&nbsp;  to continue",
      });

      return;
    }
    addTodo(todoitem, date);
    setDate("");
    setTodoItem("");
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="inputField">
        <input
          type="text"
          placeholder="Add your new todo"
          value={todoitem}
          onChange={(e) => setTodoItem(e.target.value)}
        />
      </div>
      <div className="inputField">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="inputField" style={{ justifyContent: "center" }}>
        <button type="submit">
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </form>
  );
}

export default Form;
