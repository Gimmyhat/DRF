import React from 'react'

const ToDoItem = ({todo}) => {
    return (
        <tr>
            <td>
                {todo.url}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.creator}
            </td>
        </tr>
    )
}

const ToDoList = ({todos}) => {
    return (
        <table>
            <th>
                Url
            </th>
            <th>
                Text
            </th>
            <th>
                Creator
            </th>
            {todos.map((todo_) => <ToDoItem todo={todo_}/>)}
        </table>
    )
}
export default ToDoList;
