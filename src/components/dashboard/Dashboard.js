import React, { Component } from 'react';
import ProjectList from '../projects/ProjectList';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom'
import { MetaTags } from 'react-meta-tags';

function changeType(e){
    switch(e){
        case 1:
            return "votos"
        case 2:
            return "createdAt"
        default:
            return "createdAt"
    }
}
class Dashboard extends Component {
    render(){
        const { projects, auth } = this.props
        console.log(auth.emailVerified)
        if(!auth.uid) return <Redirect to='/signin'/>
        return(
            <div className="dashboard container">
                <MetaTags>
                    <meta name="theme-color" content="#bec4fc" />
                </MetaTags>
                <div className="row">
                    <ProjectList projects={projects}/>
                    <div className="col s12 m6 l3">
                        {/* <Notifications notification={notification}/> */}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    // console.log(state)
    return{
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        notification: state.firestore.ordered.notification
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects', limit: 7, orderBy: [changeType(), "desc"] },
        { collection: 'notification', limit: 3, orderBy: ['time', 'desc'] }
    ])
    )(Dashboard)