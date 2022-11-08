import React from 'react'
import {useParams} from "react-router-dom";


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.name}
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

const ProjectName = ({projects}) => {
    let { nameId } = useParams()
    let filter_project = projects.filter((project) => project.id === parseInt(nameId))
    return (
        <table>
            <th>
                Name
            </th>
            <th>
                Users
            </th>
            <th>
                Repository
            </th>
            {filter_project.map((project_) => <ProjectItem project={project_}/>)}
        </table>
    )
}
export default ProjectName;
