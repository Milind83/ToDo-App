import React, { useState } from "react";

function Todos({ todolist, removeTodo, editTodo, toggleComplete }) {
  const [isEdit, setIsEdit] = useState(false);
  const [todoitem, setTodoItem] = useState("");

  const submitHandler = (id) => {
    if (todoitem.trim() === "") {
      alert("all fields are mendatory");
      return;
    }
    editTodo(id, todoitem);
    setTodoItem("");
    setIsEdit(false);
    alert("Todo Edited");
  };

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
              <span className="icon" onClick={() => setIsEdit(true)}>
                <i class="fas fa-edit fa-lg"></i>
              </span>

              {/* ....Delete.... */}
              <span className="icon" onClick={() => removeTodo(data.id)}>
                <i className="fas fa-trash fa-lg"></i>
              </span>
            </div>
            {isEdit && (
              <div className="wrapper popup">
                <div className="popup-box">
                  <h3>Edit Todo Item</h3>
                  <span
                    className="icon close-icon"
                    onClick={() => setIsEdit(false)}
                  >
                    <i class="fas fa-times"></i>
                  </span>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitHandler(data.id);
                  }}
                >
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
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default Todos;
