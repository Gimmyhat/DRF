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

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }


    is_authenticated() {
        return this.state.token != ''
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
            }).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })

        axios.get('http://127.0.0.1:8000/api/todo', {headers})
            .then(response => {
                const todos = response.data
                this.setState({'todos': todos,})
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
                            <Route index element={<ProjectList projects={this.state.projects}/>}/>
                            <Route path=':nameId' element={<ProjectName projects={this.state.projects}/>}/>
                        </Route>
                        <Route exact path='/todos' element={<ToDoList todos={this.state.todos}/>}/>
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
