import React from 'react'
import {Link, useParams} from "react-router-dom";
import project from "./Project";


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
    let {nameId} = useParams()
    let filter_project = projects.filter((project) => project.name.includes(parseInt(nameId)))
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
