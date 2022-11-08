import React from 'react';
import './App.css';
import axios from "axios";
import UserList from "./components/User/User";
import ProjectList from "./components/Project/Project";
import ToDoList from "./components/ToDo/Todo";
import {BrowserRouter, Route, Routes, Link, Navigate} from "react-router-dom";
import NotFount404 from "./components/NotFount404";
import ProjectName from "./components/Project/ProjectName";
import LoginForm from "./components/Auth/Auth";
import Cookies from "universal-cookie";
import ProjectForm from "./components/Project/ProjectForm";
import ToDoForm from "./components/ToDo/TodoForm";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'filteredTodo': [],
            'filteredProject': [],
        }
    }


    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }


    is_authenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }


    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            username: username,
            password: password
        })
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/project/${id}`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
            })
    }

    deleteToDo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers})
            .then(response => {
                this.setState({todos: this.state.todos.filter((item) => item.id !== id)})
            })
    }

    searchToDo(text) {
        const query = text.target.value
        let updatedList = [...this.state.todos]
        updatedList = updatedList.filter((item) => {
            return item.text.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
        this.setState({filteredTodo: updatedList})

    }

    searchProject(text) {
        const query = text.target.value
        let updatedList = [...this.state.projects]
        updatedList = updatedList.filter((item) => {
            return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
        this.setState({filteredProject: updatedList})

    }


    createProject(name, repository, users) {
        const headers = this.get_headers()
        const data = {name: name, repository: repository, users: Array(users)}
        console.log(data)
        axios.post(`http://127.0.0.1:8000/api/project/`, data, {headers})
            .then(response => {
                let new_project = response.data
                const users = this.state.users.filter((item) => item.id === new_project.users)
                new_project.users = users
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }

    createToDo(project, text, creator) {
        const headers = this.get_headers()
        const data = {project: project, text: text, creator: creator}
        console.log(data)
        axios.post(`http://127.0.0.1:8000/api/todo/`, data, {headers})
            .then(response => {
                let new_todo = response.data
                const project = this.state.projects.filter((item) => item.name === new_todo.project)[0]
                const creator = this.state.users.filter((item) => item.id === new_todo.user)[0]
                new_todo.projcet = project
                this.setState({todos: [...this.state.todos, new_todo]})
                console.log(new_todo)
            }).catch(error => console.log(error))
    }


    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
                const users = response.data
                this.setState({'users': users,})
            }).catch(error => {
            console.log(error)
            this.setState({users: []})
        })

        axios.get('http://127.0.0.1:8000/api/project', {headers})
            .then(response => {
                const projects = response.data
                this.setState({'projects': projects,})
                this.setState({'filteredProject': projects,})
            }).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })

        axios.get('http://127.0.0.1:8000/api/todo', {headers})
            .then(response => {
                const todos = response.data
                this.setState({'todos': todos,})
                this.setState({'filteredTodo': todos,})
            }).catch(error => {
            console.log(error)
            this.setState({todos: []})
        })

    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li><Link to='/users'>Пользователи</Link></li>
                            <li><Link to='/projects'>Проекты</Link></li>
                            <li><Link to='/todos'>ToDo</Link></li>
                            <li>
                                {this.is_authenticated() ? <button
                                    onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route exact path='/users' element={<UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' element={<Navigate to='/projects'/>}/>
                        <Route path='/projects'>
                            <Route index element={<ProjectList projects={this.state.filteredProject}
                                                               searchProject={(text) => this.searchProject(text)}
                                                               deleteProject={(id) => this.deleteProject(id)}/>}/>
                            <Route path=':nameId' element={<ProjectName projects={this.state.projects}/>}/>
                        </Route>
                        <Route path='/projects/create' element={<ProjectForm users={this.state.users}
                                                                             createProject={(name, repository, users) => this.createProject(name, repository, users)}/>}/>
                        <Route exact path='/todos'
                               element={<ToDoList todos={this.state.filteredTodo}
                                                  deleteToDo={(id) => this.deleteToDo(id)}
                                                  searchTodo={(text) => this.searchToDo(text)}/>}/>
                        <Route path='/todos/create'
                               element={<ToDoForm users={this.state.users} projects={this.state.projects}
                                                  createToDo={(project, text, user) => this.createToDo(project, text, user)}
                               />}/>
                        <Route exact path='/login' element={<LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>
                        <Route path='*' element={<NotFount404/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}


export default App;