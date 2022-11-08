import React from 'react'
import {Link} from "react-router-dom";

const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <div>
            <table>
                <tr>
                    <th>Name</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                </tr>
                {users.map((user_) => <UserItem user={user_} />)}
            </table>
        </div>
    )
}
export default UserList;
