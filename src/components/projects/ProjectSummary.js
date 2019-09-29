import React from 'react'
import pt from 'moment/locale/pt-br'
import moment from 'moment'
import { Link } from 'react-router-dom';
const ProjectSummary = ({project}) => {
    return (
        <div className="card-item">
            <div className="card-content">
                <span className="card-title">{project.title}</span>
                <p className="card-details">Autor: <Link style={{textDecoration: 'none', color: '#8ec5fc'}} to={"/perfil/" + project.authorId}>{project.authorFirstName} {project.authorLastName}</Link></p>
                <p className="grey-text">{moment(project.createdAt.toDate()).locale('pt-br', pt).calendar()}</p>
                <p className="like-text"><i style={{ marginLeft: 10 }} className="fas fa-thumbs-up"></i> <b>{project.votos} </b></p>
            </div>
        </div>
    )
}

export default ProjectSummary