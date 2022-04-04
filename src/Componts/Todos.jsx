import React, { useState, useEffect } from "react";
import Search from "./Search";
import SingleTodo from "./SingleTodo";

function Todos({ todolist, removeTodo, editTodo, toggleComplete }) {
  const [isEdit, setIsEdit] = useState(false);
  const [todoitem, setTodoItem] = useState("");
  const [search, setSearch] = useState("");
  const [mytodolist, setMytodolist] = useState([]);
  const [errorTxt, setErrorTxt] = useState(false);
  const [result, setResult] = useState(false);

  // to solve id error (first element not editing)
  const [todoid, setTodoId] = useState("");

  const searchHandler = () => {
    if (search.trim() === "") {
      alert("please add term to search");
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

  const searchOnChange = (e) => {
    setSearch(e.target.value);
  };

  function submitHandler(e) {
    e.preventDefault();
    setResult(false);
    if (todoitem.trim() === "") {
      alert("all fields are mendatory");
      return;
    }
    console.log("submit handler", todoid);
    editTodo(todoid, todoitem);
    setTodoItem("");
    setIsEdit(false);
    setTodoId("");
    alert("Todo Edited");
  }

  const isEditOpen = (name, id) => {
    setTodoId(id);
    setTodoItem(name);
    setIsEdit(true);
  };
  const isEditclose = () => {
    setTodoId("");
    setIsEdit(false);
  };

  const  todoItemOnChange = (e) => {
    setTodoItem(e.target.value);
  };

  // adding todolist prop data to mytodolist if todolist changes (added data or edited data)
  useEffect(() => {
    setMytodolist(todolist);
  }, [todolist]);

  return (
    <>
      <Search
        todolist={todolist}
        search={search}
        searchOnChange={searchOnChange}
        searchHandler={searchHandler}
        errorTxt={errorTxt}
        showAllTask={showAllTask}
        result={result}
      />
      {/* checking errorTxt is not true and maping mytodolist*/}
      <ul className="todoList">
        {!errorTxt &&
          mytodolist.map((data) => (
            <SingleTodo
              key={data.id}
              data={data}
              toggleComplete={toggleComplete}
              isEditOpen={isEditOpen}
              removeTodo={removeTodo}
              isEdit={isEdit}
              isEditclose={isEditclose}
              submitHandler={submitHandler}
              todoitem={todoitem}
              todoItemOnChange={todoItemOnChange}
            />
          ))}
      </ul>
    </>
  );
}

export default Todos;
