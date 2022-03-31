import React from "react";

const SingleTodo = ({
  data,
  toggleComplete,
  isEditOpen,
  removeTodo,
  isEdit,
  isEditclose,
  submitHandler,
  todoitem,
  todoItemOnChange,
}) => {
  return (
    <li className="todo-container">
      {/* .....Edit.... */}
      <div
        className={`todo-name ${data.isCompleted ? "strike-text" : ""} `} // if  is completedtrue then striketesxt added
      >
        {data.name}
      </div>

      {/* // if is completed is true then display */}
      {data.isCompleted && <div className="timestamp">{data.time}</div>}

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
        <span className="icon" onClick={() => isEditOpen(data.name, data.id)}>
          <i class="fas fa-edit fa-lg"></i>
        </span>

        {/* ....Delete.... */}
        <span className="icon" onClick={() => removeTodo(data.id)}>
          <i className="fas fa-trash fa-lg"></i>
        </span>
      </div>

      {/* checking isEdit is true this will show is true */}
      {isEdit && (
        <div className="wrapper popup">
          <div className="popup-box">
            <h3>Edit Todo Item</h3>
            <span className="icon close-icon" onClick={isEditclose}>
              <i class="fas fa-times"></i>
            </span>
          </div>
          <form
            onSubmit={(e) => {
              submitHandler(e, data.id);
            }}
          >
            <div className="inputField">
              <input
                type="text"
                placeholder="Add your new todo"
                value={todoitem}
                onChange={todoItemOnChange}
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
};

export default SingleTodo;
