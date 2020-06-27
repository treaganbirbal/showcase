import React from 'react'
import {Link} from 'react-router-dom'

const ProjectListItem = props => {
  console.log('props from List: ', props)
  return props.projects.map(project => {
    return (
      <div className="list-ctn" key={project.id}>
        <Link to={`/projects/${project.id}`}>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
          <img
            src={project.imageUrl}
            alt="project-image"
            width="500"
            height="200"
          />
        </Link>
      </div>
    )
  })
}

export default ProjectListItem
