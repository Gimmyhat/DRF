import React from 'react'
import {Link} from "react-router-dom";


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td><Link to={`/projects/${project.id}`}>{project.name}</Link></td>
            <td>{project.users}</td>
            <td>{project.repository}</td>
            <td>
                <button onClick={() => deleteProject(project.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject, searchProject}) => {
    return (
        <div>
            <div className="search-header">
                <div className="search-text">Search:</div>
                <input id="search-box" onChange={(event) => searchProject(event)}/>
            </div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Users</th>
                    <th>Repository</th>
                    <th></th>
                </tr>
                {projects.map((project_) => <ProjectItem project={project_} deleteProject={deleteProject}/>)}
            </table>
            <Link to='/projects/create'>Create</Link>
        </div>
    )
}
export default ProjectList;
