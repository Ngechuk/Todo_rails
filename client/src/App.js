// import logo from './logo.svg';
import { React, useState } from "react";
import "./App.css";
import LogIn from "./components/login";
import SignUp from "./components/signup";
import HomePage from "./components/homepage";
import Todos from "./components/todo";
import SingleTodo from "./components/singletodo";
import UpdateTodo from "./components/updatetodo";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  let [loginDetails, setLoginDetails] = useState({ name: "", password: "" });

  let [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  let [userID, setUserID] = useState(null);

  let [todo, setTodo] = useState({
    name: "",
    description: "",
    due: "",
    status: "NOT STARTED",
    userID: "",
  });

  let [allTodos, setAllTodos] = useState([]);

  let [currTodo, setcurrTodo] = useState();

  let [updatedStatus, setUpdatedStatus] = useState({ status: "" });

  let [todayTodos, setTodayTodos] = useState(false);

  let [filterValues, setFilterValues] = useState({ status: "ALL", due: "" });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <LogIn
                loginDetails={loginDetails}
                setLoginDetails={setLoginDetails}
                userID={userID}
                setUserID={setUserID}
                setAllTodos={setAllTodos}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignUp
                signupDetails={signupDetails}
                setSignupDetails={setSignupDetails}
              />
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/todos"
            element={
              <Todos
                setUserID={setUserID}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
                userID={userID}
                todo={todo}
                setTodo={setTodo}
                allTodos={allTodos}
                setAllTodos={setAllTodos}
                currTodo={currTodo}
                setcurrTodo={setcurrTodo}
                todayTodos={todayTodos}
                setTodayTodos={setTodayTodos}
              />
            }
          />
          <Route
            path="/todos/:id"
            element={<SingleTodo currTodo={currTodo} />}
          />
          <Route
            path="/todos/update/:id"
            element={
              <UpdateTodo
                setFilterValues={setFilterValues}
                currTodo={currTodo}
                userID={userID}
                setAllTodos={setAllTodos}
                updatedStatus={updatedStatus}
                setUpdatedStatus={setUpdatedStatus}
                setTodayTodos={setTodayTodos}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
