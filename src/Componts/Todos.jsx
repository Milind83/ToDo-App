import React, { useState, useEffect } from "react";

function Todos({ todolist, removeTodo, editTodo, toggleComplete }) {
  const [isEdit, setIsEdit] = useState(false);
  const [todoitem, setTodoItem] = useState("");
  const [search, setSearch] = useState("");
  const [mytodolist, setMytodolist] = useState([]);
  const [errorTxt, setErrorTxt] = useState(false);
  const [result, setResult] = useState(false);

  const searchHandler = () => {
    if (search.trim() === "") {
      alert("please add ToDo to search");
      return;
    }
    // filtering data if search txt matches
    const newData = todolist.filter((singleTodo) =>
      singleTodo.name.toLowerCase().includes(search.toLowerCase())
    );
    // checking if array is empty to show error
    if (newData.length !== 0) {
      setErrorTxt(false);
      setResult(true);
      setMytodolist(newData);
    } else {
      setErrorTxt(true);
      setMytodolist(newData);
    }
  };

  // show all tasks
  const showAllTask = () => {
    setResult(false);
    setErrorTxt(false);
    setMytodolist(todolist);
  };

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

  // adding todolist prop data to mytodolist if todolist changes (added data or edited data)
  useEffect(() => {
    setMytodolist(todolist);
  }, [todolist]);

  return (
    <>
      {/* checking todolist is empty id empty this will not show */}
      {todolist.length !== 0 && (
        <>
          <div className="inputField">
            <input
              type="text"
              placeholder="Search todo"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={searchHandler}>
              <i class="fas fa-search"></i>
            </button>
          </div>
        </>
      )}
      {/* checking errorTxt is true if true this will show else hidden */}
      {errorTxt && (
        <div className="footer">
          <span>No results found</span>
          <button onClick={showAllTask}>show all task</button>
        </div>
      )}

      {/* checking result is true if true this will show else hidden */}
      {result && (
        <div className="footer">
          <span>search results for {search}</span>
          <button onClick={showAllTask}>show all task</button>
        </div>
      )}

      {/* checking errorTxt is not true and maping mytodolist*/}
      <ul className="todoList">
        {!errorTxt &&
          mytodolist.map((data) => {
            return (
              <li key={data.id} className="todo-container">
                {/* .....Edit.... */}
                <div
                  className={`todo-name ${
                    data.isCompleted ? "strike-text" : ""
                  } `} // if  is completedtrue then striketesxt added
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

                {/* checking isEdit is true this will show is true */}
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
    </>
  );
}

export default Todos;
