import React from "react";

const Search = ({
  todolist,
  search,
  searchOnChange,
  searchHandler,
  errorTxt,
  showAllTask,
  result,
}) => {
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
              onChange={searchOnChange}
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
    </>
  );
};

export default Search;
