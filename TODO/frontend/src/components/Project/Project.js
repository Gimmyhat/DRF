import React from 'react'
import {Link} from "react-router-dom";


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
            </td>
            <td>
                {project.users}
            </td>
            <td>
                {project.repository}
            </td>
        </tr>
    )
}

const ProjectList = (
    {
        projects
    }
) => {
    return (
        <table>
            <th>
                ID
            </th>
            <th>
                Name
            </th>
            <th>
                Users
            </th>
            <th>
                Repository
            </th>
            {projects.map((project_) => <ProjectItem project={project_}/>)}
        </table>
    )
}
export default ProjectList;
