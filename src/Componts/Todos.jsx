import React from "react";

function Todos({ todolist, removeTodo, editTodo, toggleComplete }) {
  return (
    <ul className="todoList">
      {todolist.map((data) => {

        return (
          <li key={data.id} className="todo-container">

            {/* .....Edit.... */}
            <div
              className={`todo-name ${data.isCompleted ? "strike-text" : ""} `} // if  is completedtrue then striketesxt added
            >
              {data.name}
            </div>

            {/* ....complited.... */}
            <div className="icons">
              <span className="icon">
            <div>
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={data.isCompleted}
                onChange={() => {
                  toggleComplete(data.id, !data.isCompleted); //  true value change in false and reverse
                }}
              />
            </div>

            {/* ....Edit.... */}
              </span>
              <span className="icon" onClick={() => editTodo(data.id)}>
                <i class="fas fa-edit fa-lg"></i>
              </span>

              {/* ....Delete.... */}
              <span className="icon" onClick={() => removeTodo(data.id)}>
                <i className="fas fa-trash fa-lg"></i>
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default Todos;
