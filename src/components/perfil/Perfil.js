import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import ProjectSummary from './../projects/ProjectSummary';
import TopPerfil from './TopPerfil';

class Perfil extends Component {
    state = {
        verify: false,
        projects1: [],
        nameProfile: ''
    }

    getNameProfile = () => {
        const { projects } = this.props
        const loc = window.location.pathname
        loc.toString()
        const id = loc.substring(loc.length - 28, loc.length);
        var nome = ""
        projects && projects.map(project => {
            if (id === project.authorId) {
                nome = project.authorFirstName + " " + project.authorLastName
                return nome
            }
            return null
        })
        return nome
    }    
    render() {
        const { projects, auth } = this.props
        const loc = window.location.pathname
        loc.toString()
        const id = loc.substring(loc.length - 28, loc.length);
        console.log(id)
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="perfil container">
                <TopPerfil nome={this.getNameProfile()}/>
                <div className="row">
                    {projects && projects.map(project => {
                        if (id === project.authorId) {
                            this.getNameProfile(project.authorFirstName, project.authorLastName)
                            return (
                                <Link style={{textDecoration: 'none', color: '#080a0f'}} to={'/project/' + project.id} key={project.id}>
                                    <ProjectSummary project={project} />
                                </Link>
                            )
                        }
                        return null
                    })}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        notification: state.firestore.ordered.notification
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects', limit: 7, orderBy: ["createdAt", "desc"] },
        { collection: 'notification', limit: 3, orderBy: ['time', 'desc'] }
    ])
)(Perfil)