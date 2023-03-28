import React from "react";
import { NavLink } from "react-router-dom";
import '../style/singletodo.css'

function SingleTodo({ currTodo }) {
  function showCurrDate (currentTodo){
    let yy = currentTodo.slice(0, 4)
    let m = currentTodo.slice(5, 7)
    let d = currentTodo.slice(8, 10)
    return (`${yy}-${m}-${d}`)
  }
  return (
    <div className="formDivSingle">
      <div className="loginDivSingle">
        <div className="logInFormSingle">
      <h1 style={{margin: "30px", fontSize: "4vw"}}>{currTodo.name}</h1>
      <p className="singleAttr"><b className="singleAttrTodo" style={{paddingRight: "102px"}}>STATUS: </b>{currTodo.status}</p>
      <p className="singleAttr"><b className="singleAttrTodo" style={{paddingRight: "50px"}}>DESCRIPTION: </b>{currTodo.description}</p>
      <p className="singleAttr"><b className="singleAttrTodo" style={{paddingRight: "130px"}}>DUE: </b>{showCurrDate(currTodo.due)}</p>
    <button className="cancelUpdateTodo">  <NavLink to={`/todos`} className="cancelNav">BACK</NavLink></button>
    </div>
    </div>
    </div>
  );
}

export default SingleTodo;
