import React, { useState } from "react";

function Form({ addTodo }) {
  const [todoitem, setTodoItem] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (todoitem.trim() === "" ) {
      alert("all fields are mendatory")
      return;
    } 
    addTodo(todoitem);
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
        <button type="submit">
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </form> 
  );
}

export default Form;
