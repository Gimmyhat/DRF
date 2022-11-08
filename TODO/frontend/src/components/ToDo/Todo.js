import React from 'react'
import {Link} from "react-router-dom";


const ToDoItem = ({todo, deleteToDo}) => {
    return (
        <tr>
            <td> {todo.id}</td>
            <td>{todo.url}</td>
            <td>{todo.text}</td>
            <td>{todo.creator}</td>
            <td>
                <button onClick={() => deleteToDo(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ToDoList = ({todos, deleteToDo, searchTodo}) => {
    return (
        <div>
            <div className="search-header">
                <div className="search-text">Search:</div>
                <input id="search-box" onChange={(event) => searchTodo(event) }/>
            </div>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Url</th>
                    <th>Text</th>
                    <th>Creator</th>
                    <th></th>
                </tr>
                {todos.map((todo) => <ToDoItem todo={todo} deleteToDo={deleteToDo}/>)}
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}
export default ToDoList;
