import React from "react";

function Todos({ todolist, removeTodo }) {
  return (
    <ul className="todoList">
      {todolist.map((data) => {
        let date = new Date(...data.date.split("-"));
        const month = date.toLocaleString("en-US", { month: "long" });
        const day = date.toLocaleString("en-US", { day: "2-digit" });
        const year = date.getFullYear();

        return (
          <li key={data.id} className="todo-container">
            <div className="date-container">
              <div className="date__month">{month}</div>
              <div className="date__year">{year}</div>
              <div className="date__day">{day}</div>
            </div>
            <div className="todo-name">{data.name}</div>
            <span className="icon" onClick={() => removeTodo(data.id)}>
              <i className="fas fa-trash fa-lg"></i>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default Todos;
