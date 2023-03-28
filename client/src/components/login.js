import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import '../style/login.css'

function LogIn({
  loginDetails,
  setLoginDetails,
  userID,
  setUserID,
  setAllTodos,
}) {
  let takeToTodo = useNavigate();
  return (
    <div className="formDiv">

<h1
        style={{
          textAlign: "left",
          padding: "0px 10px 10px 10px",
          fontSize: "4vw",
          fontFamily: "fantasy",
          width: "40%",
        }}
      >
        Todo List
      </h1>

      <div className="loginDiv">
      <form
        className="logInForm"
        onSubmit={(e) => {
          e.preventDefault();
          // console.log(loginDetails)

          fetch('/login', {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              name: loginDetails.name,
              password: loginDetails.password,
            }),
          })
            .then((resp) => resp.json())
            .then((data) => {
              // console.log(data)
              if (data.isRegistered === "true") {
                fetch("/todos/:id", {
                  method: "PATCH",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify({
                    user_id: data.userId,
                  }),
                })
                  .then((resp) => resp.json())
                  .then((dataz) => {
                    // console.log(data)

                    setAllTodos(dataz);
                    setUserID(data.userId);
                    takeToTodo("/todo");
                    setLoginDetails({ name: "", password: "" });
                  });
              } else if (data.isRegistered === "false") {
                alert(
                  "No matching user found ensure you enter correct credentials"
                );
                setLoginDetails({ name: "", password: "" });
              }
            });
        }}
      >
        <h1>Log In</h1>
        <label htmlFor="userName">Name</label>
        <br />
        <input
          type="text"
          id="userName"
          required
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, name: e.target.value })
          }
          value={loginDetails.name}
        />{" "}
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          id="password"
          required
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, password: e.target.value })
          }
          value={loginDetails.password}
        />
        <br />
        <input type="submit" id="submitBtn" value="LOGIN" />
        <p>
          Dont have an account? <NavLink to="/signup">SIGNUP</NavLink>
        </p>
      </form>
      </div>
    </div>
  );
}

export default LogIn
