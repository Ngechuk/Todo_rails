import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import '../style/updatetodo.css'

function UpdateTodo({
  setFilterValues,
  currTodo,
  userID,
  setAllTodos,
  updatedStatus,
  setUpdatedStatus,
  setTodayTodos,
}) {
  let takeToTodo = useNavigate();

  function showCurrDate (currentTodo){
    let yy = currentTodo.slice(0, 4)
    let m = currentTodo.slice(5, 7)
    let d = currentTodo.slice(8, 10)
    return (`${yy}-${m}-${d}`)
  }

  return (
    <div className="formDivUpdate">
            <h1
        style={{
          textAlign: "left",
          padding: "0px 10px 10px 10px",
          fontSize: "4vw",
          fontFamily: "fantasy",
          width: "40%",
        }}
      >
        Todo MANAGER
      </h1>

      <div className="loginDivUpdate">
      <form
        className="logInFormUpdate"
        onSubmit={(e) => {
          e.preventDefault();

          if (updatedStatus.status === "") {
            setUpdatedStatus({ status: "" });
          } else {
            fetch(`https://todos-yf5l.onrender.com/todos/update/${currTodo.id}`, {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                status: updatedStatus.status,
              }),
            })
              .then((resp) => resp.json())
              .then((data) => {
                // console.log(data)
                setUpdatedStatus({ status: "" });
              });
          }

          fetch("https://todos-yf5l.onrender.com/todos", {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              user_id: userID,
            }),
          })
            .then((resp) => resp.json())
            .then((data) => {
              // console.log(data)

              setAllTodos(data);
              setTodayTodos(false);
              takeToTodo("/todos");
              // alert("updated successfully");
              setFilterValues({ status: "ALL", due: `${""}-${""}-${""}` });
            });
        }}
      >
        <label htmlFor="todoName" style={{paddingRight: "20px"}}>Todo NAME:</label>
        <input type="text" disabled id="todoName" value={currTodo.name} />
        <br />
        <label htmlFor="todoDescription">DESCRIPTION:</label>
        <input
          type="text"
          disabled
          id="todoDescription"
          value={currTodo.description}
        />
        <br />
        <label htmlFor="todoStatus">STATUS:</label>
        <br />
        <div className="choiceStatus">
        <input
          type="radio"
          name="statusChoice"
          onChange={(e) => setUpdatedStatus({ status: "NOT STARTED" })}
          value={updatedStatus.status}
        />
        NOT STARTED
        </div>
        {/* <br /> */}
        <div className="choiceStatus">
        <input
          type="radio"
          name="statusChoice"
          onChange={(e) => setUpdatedStatus({ status: "ONGOING" })}
          value={updatedStatus.status}
        />
        ONGOING
        </div> 
        {/* <br /> */}
        <div className="choiceStatus">
        <input
          type="radio"
          name="statusChoice"
          onChange={(e) => setUpdatedStatus({ status: "COMPLETED" })}
          value={updatedStatus.status}
        />
        COMPLETED
        </div>
        <br />
        <br />
        <p style={{clear: "both"}}><label htmlFor="todoDue"  >DUE DATE:</label>
        <b style={{paddingLeft: "40px"}}>{showCurrDate(currTodo.due)}</b></p>
        <br />
        <button
        className="cancelUpdateTodo"
          onClick={() => {
            setUpdatedStatus({ status: "" });
          }}
        >
          {" "}
          <NavLink className="cancelNav" to={`/todos`} >CANCEL</NavLink>{" "}
        </button>
        <input type="submit" value="UPDATE" />
      </form>
      </div>
    </div>
  );
}

export default UpdateTodo;
