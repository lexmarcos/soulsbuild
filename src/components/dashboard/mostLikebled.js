import React, { Component } from 'react';
import ProjectList from '../projects/ProjectList';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom'

class MostLikebled extends Component {
    render(){
        const { projects, auth} = this.props
        if(!auth.uid) return <Redirect to='/signin'/>
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className=""></div>
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
        { collection: 'projects', limit: 7, orderBy: ["votos", "desc"] },
        { collection: 'notification', limit: 3, orderBy: ['time', 'desc'] }
    ])
    )(MostLikebled)