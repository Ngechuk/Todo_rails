
import { React } from "react";
import TodoUl from "./todoul";
import { useNavigate } from "react-router-dom";
import '../style/todos.css'
function Todos({
  setUserID,
  filterValues,
  setFilterValues,
  userID,
  todo,
  setTodo,
  allTodos,
  setAllTodos,
  currTodo,
  setcurrTodo,
  todayTodos,
  setTodayTodos,
}) {
  // console.log(todayTados)
  let takeLogIn = useNavigate();
  let todosShown = allTodos.map((todod) => {
    return (
      <TodoUl
        key={todod.id}
        todod={todod}
        currTodo={currTodo}
        setcurrTodo={setcurrTodo}
        allTodos={allTodos}
        setAllTodos={setAllTodos}
      />
    );
  });

  return (
    <div
    className="todoDiv"
      id="todos"
      onClick={() => {
        if (!userID) {
          takeLogIn("/login");
        }
      }}
    >
            <button
      className="homepageLinks"
        onClick={() => {
          setUserID(null);
          takeLogIn("/login");
        }}
      >
        LOG OUT
      </button>
      <h1
        style={{
          textAlign: "left",
          padding: "0px 10px 10px 10px",
          fontSize: "4vw",
          fontFamily: "fantasy",
          width: "40%",
        }}
      >
        TODO MANAGER
      </h1>
     <div  style={{ textAlign: "right", paddingRight: "30px", clear: "both" }}>
        <p>
          <b style={{ fontSize: "2vw" }}>
           organize All your Todos here
          </b>
        </p>
      </div>

        <div className="formDivTodos">
      <div className="loginDivTodos">
      <form
      className="logInFormTodos"
        onSubmit={(e) => {
          e.preventDefault();

          fetch("https://todos-yf5l.onrender.com/todos", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              name: todo.name,
              description: todo.description,
              due: todo.due,
              status: todo.status,
              user_id: userID,
            }),
          })
            .then((resp) => resp.json())
            .then((data) => {
              console.log(data);
              setTodo({name: '', description: '', due: '', status: ''})
            });

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
              setFilterValues({status: "ALL", due: ''})
            });
        }}
      >
              <h1 style={{textAlign: "center"}}>ADD Todo</h1>
        <label htmlFor="todoName">TODO NAME:</label>
        <input
        style={{marginLeft: "50px", width: "40%"}}
          type="text"
          id="todoName"
          required
          onChange={(e) => setTodo({ ...todo, name: e.target.value })}
          value={todo.name}
        />
        <br />

        <label htmlFor="todoDescription">DESCRIPTION:</label>
        <input
        style={{marginLeft: "29px", width: "40%"}}
          type="text"
          id="todoDescription"
          required
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          value={todo.description}
        />
        <br />

        <label htmlFor="todoStatus">STATUS:</label>
        <select
        style={{marginLeft: "110px"}}
          id="todoStatus"
          required
          onChange={(e) => setTodo({ ...todo, status: e.target.value })}
          value={todo.status}
        >
          <option value="NOT STARTED">NOT STARTED</option>
          <option value="ONGOING">ONGOING</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
        <br />

        <label htmlFor="todoDue">DUE DATE:</label>
        <input
        style={{marginLeft: "70px", width: "40%"}}
          type="date"
          id="todoDue"
          required
          onChange={(e) => setTodo({ ...todo, due: e.target.value })}
          value={todo.due}
        />
        <br />
        <input type="submit" className="createBtn" value="CREATE" />
      </form>
      </div>
      </div>
      <h2 className="clickh2">
        CLICK TO SEE:  
        <button
        className="todayBtn"
          onClick={() => {
            if (todayTodos === false) {
              setTodayTodos(true);
              let today = new Date();
              let dd = String(today.getDate()).padStart(2, "0");
              let mm = String(today.getMonth() + 1).padStart(2, "0");
              let yyyy = today.getFullYear();
              let x = allTodos.filter(
                (tTodo) =>
                  +tTodo.due.slice(0, 4) === yyyy &&
                  tTodo.due.slice(5, 7) === mm &&
                  tTodo.due.slice(8, 10) === dd
              );
              setFilterValues({ status: "ALL", due: `${yyyy}-${mm}-${dd}` });

              setAllTodos(x);

              // console.log("Heres the staple", yyyy,mm, dd)
            } else {
              setTodayTodos(false);
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
                  setFilterValues({ status: "ALL", due: `` });
                });
            }
          }}
        >
           {todayTodos === false ? "TODAY TODOS" : "ALL TODOS"}
         </button>
      </h2>
      <h3 style={{clear: "both"}}>{`Todos for ${todayTodos === false ? "EVERYDAY" : "TODAY"}`}</h3>


      <form
      className="filterForm"
        onSubmit={(e) => {
          e.preventDefault();
          let searchDate = document.getElementById("dueFilterTodo").value;
          let searchStatus = document.getElementById("statusFilterTodo").value;
          // console.log(searchDate, searchStatus)
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
              let x;
              if (searchStatus !== "ALL") {
                x = data.filter((todo) => todo.status === searchStatus);
              } else {
                x = data;
              }

              if (searchDate) {
                let finalx = x.filter(
                  (tTodo) =>
                    tTodo.due.slice(0, 4) === searchDate.slice(0, 4) &&
                    tTodo.due.slice(5, 7) === searchDate.slice(5, 7) &&
                    tTodo.due.slice(8, 10) === searchDate.slice(8, 10)
                );
                //  console.log(typeof(searchDate))
                setAllTodos(finalx);
              } else {
                setAllTodos(x);
              }
            });
        }}
      >
              <p style={{textAlign: "center", paddingBottom: "10px"}}>Filters</p>

        <label htmlFor="statusFilterTodo" style={{float: "left", marginLeft: "190px"}}>Status:</label>
        <select
        style={{float: "left", marginRight: "10px"}}
          name="statusFilterTodo"
          id="statusFilterTodo"
          onChange={(e) =>
            setFilterValues({ ...filterValues, status: e.target.value })
          }
          value={filterValues.status}
        >
          <option value="ALL">ALL</option>
          <option value="NOT STARTED">NOT STARTED</option>
          <option value="ONGOING">ONGOING</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
        {/* <br /> */}
        <label htmlFor="dueFilterTodo" style={{float: "left"}}>Date:</label>
        <input
        style={{float: "left"}}
          type="date"
          id="dueFilterTodo"
          onChange={(e) =>
            setFilterValues({ ...filterValues, due: e.target.value })
          }
          value={filterValues.due}
        />
        <input type="submit" style={{float: "left"}} className="filterBtn" value="Filter" />
      </form>

      <ul className="todoCardUl">{todosShown}</ul>
    </div>
  );
}

export default Todos;
