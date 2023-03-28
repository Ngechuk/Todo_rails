import React from "react";
import { NavLink } from "react-router-dom";
import '../style/todos.css'

function TodoUl({ todod, setcurrTodo, allTodos, setAllTodos }) {
  function showCurrDate (currentTodo){
    let yy = currentTodo.slice(0, 4)
    let m = currentTodo.slice(5, 7)
    let d = currentTodo.slice(8, 10)
    return (`${yy}-${m}-${d}`)
  }
  return (
    <li className="todoCardLi">
      <h2 className="restInLi">{todod.name}</h2>
      <p style={{float: "left", paddingLeft: "150px"}}><b>STATUS: </b>{todod.status}</p>
      <p><b>DUE: </b>{showCurrDate(todod.due)}</p>
      <button className="liBtn1" onClick={() => setcurrTodo(todod)}>
        {" "}
        <NavLink to={`/todos/${todod.id}`} style={{textDecoration: "none", color: "black"}}>More info</NavLink>
      </button>
      <button className="liBtn2" onClick={() => setcurrTodo(todod)}>
        {" "}
        <NavLink to={`/todos/update/${todod.id}` } style={{textDecoration: "none", color: "black"}}>Edit</NavLink>
      </button>
      <button
      className="liBtn3"
        onClick={() => {
          fetch(`https://todos-yf5l.onrender.com/todos/${todod.id}`, {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
            },
          })
            .then((resp) => resp.json())
            .then((data) => {
            //   console.log(data);
              let remainingTodos = allTodos.filter(
                (oneTodo) => oneTodo.id !== data.id
              );
              setAllTodos(remainingTodos);
            });
        }}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoUl;
