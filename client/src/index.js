import React from 'react';
import {render} from 'react-dom';


import {Header} from './inc/header';
import {Footer} from './inc/footer';
import {TodoForm} from './todoForm';
import {TodoList} from './todoList';
import {Login} from './login';
import SignupForm from './signupForm';


class TodoApp extends React.Component {

    constructor() {
        super();
        let myTasks = [
            {text: 'Pack for the Space', status: 'passive'},
            {text: 'Watch Space Documentary', status: 'active'},
            {text: 'Share the Project on Github', status: 'passive'}
        ];
        let localTasks = localStorage.getItem('tasks');
        if (localTasks!==null){
            localTasks = JSON.parse(localTasks);
            myTasks = localTasks;
        }
        this.state = {
            

            userSession: TodoApp.getUserSessionData(),
            tasks: myTasks
        };
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.doneTask = this.doneTask.bind(this);
        this.doLogin = this.doLogin.bind(this);
    }

    /**
    
     * if user is logged return the user session data from local storage
     * also it is an example usage for static method defining
     * @returns {*}
     */
    static getUserSessionData(){
        let loginData = localStorage.getItem('login');
        loginData = JSON.parse(loginData);
        if (loginData!==null && loginData.login===true){
            return {userName:loginData.userName};
        } else {
            return false;
        }
    }

    /**
     
     * Check user is logged
     * @returns {boolean}
     */
    static isLogged() {
        let loginData = localStorage.getItem('login');
        loginData = JSON.parse(loginData);
        if (loginData!==null && loginData.login===true){
            return true;
        }
        return false;
    }

    /**
   
     * do login user and data set to local storage
     * @param userName
     */
    doLogin(userName){
        let loginData = {
            login:true,
            userName:userName};
        this.setState({
            userSession:{
                userName:loginData.userName,
            }});
        loginData = JSON.stringify(loginData);
        localStorage.setItem('login',loginData);
    }

    /**
     
     * adding new task to todolist
     * @param task
     */
    addTask(task) {
        let updatedList = this.state.tasks;
        updatedList.push({text: task, status: 'passive'});
        this.setState({tasks: updatedList});
        this.updateLocalStorage(updatedList);
    }


    /**
     
     * removing the task from todolist via task_id
     * @param task_id
     */
    removeTask(task_id) {
        let updatedList = this.state.tasks;
        updatedList.splice(task_id.replace('task_', ''), 1);
        this.setState({tasks: updatedList});
        this.updateLocalStorage(updatedList);
    }


    /**
     
     * changing the status ( done / to do ) from todolist via task_id
     * @param task_id
     */
    doneTask(task_id) {
        let updatedList = this.state.tasks;
        let currentStatus = updatedList[task_id.replace('task_', '')].status;
        let newStatus = 'active';
        if (currentStatus === 'active') {
            newStatus = 'passive';
        }
        updatedList[task_id.replace('task_', '')].status = newStatus;
        this.setState({tasks: updatedList});
        this.updateLocalStorage(updatedList);
    }

    /**
    
     * Updating local storage data
     * @param updatedList
     */
    updateLocalStorage(updatedList){
        var updatedList = JSON.stringify(updatedList);
        localStorage.setItem('tasks',updatedList);
        return true;
    }

    /**
     
     * rendering the app
     * @returns {XML}
     */
    render() {
        /**
     
         * If user ise logged show the users's todolist else show the login dialog
         */
        let layout = (<Login doLogin={this.doLogin} />);
        if (TodoApp.isLogged()===true) {
            layout = (
                <div>
                    <Header loginData={TodoApp.getUserSessionData}/>
                    <TodoForm addTask={this.addTask}/>
                    <TodoList myList={this.state.tasks} addTask={this.addTask} removeTask={this.removeTask}
                              doneTask={this.doneTask}/>
                    <Footer/>
                </div>
            );
        }
        return (
            <div>
                <div className="content">
                    {layout}
                </div>
            </div>
        )
    }
}

render(<TodoApp/>, document.getElementById('appRoot'));
