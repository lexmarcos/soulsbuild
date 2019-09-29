import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect , Link} from 'react-router-dom';
import { updateProject } from '../../store/actions/updateActions';
import moment from 'moment'
class ProjectDetails extends Component {
    state = {
        like: 1,
        deslike: -1,
        disabled: false,
        verify: false,
        user: ""
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        if (e.target.id === "votosPositivos") {
            this.props.updateProject(this.state.like);
            this.setState({ disabled: true })
        }
        if (e.target.id === "votosNegativos") {
            this.setState({ votos: 'negativo' })
            this.props.updateProject(this.state.deslike);
            this.setState({ disabled: true })
        }
        e.preventDefault();
        // console.log(this.state)

    }
    galado(e) {
        this.getVotos(e)
    }
    verifyLike = (x, y) => {
        if (x === "true") {
            this.setState({ disabled: true })
            this.setState({ verify: true })
        }
        else {
            this.setState({ disabled: false })
            this.setState({ verify: true })
            this.setState({ user: y })
        }
    }
    render() {
        const { project, auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        if (project) {
            // const dale =  project.votos
            // if(this.state.votos !== dale){
            //     this.setState({votos: dale})
            // }

            const votes = project.usersVote
            if (this.state.verify === false) {
                if (votes.indexOf(auth.uid) > -1) {
                    // console.log("Encontrou");
                    this.setState({ disabled: true })
                    this.setState({ verify: true })
                } else {
                    // console.log("Não encontrou");
                    this.setState({ disabled: false })
                    this.setState({ verify: true })
                }
            }
            return (
                <div>
                    <div className="content">
                        <div className="white">
                            <div className="">
                                <span className="tituloCard">{project.title}</span>
                                <table className="tableAtributos" style={{ marginTop: '30px' }}>
                                    <tr>
                                        <th>Atributo</th>
                                        <th>Pontos</th>
                                    </tr>
                                    <tr>
                                        <td>Level recomendado</td>
                                        <td>
                                            {project.level}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Vigor</td>
                                        <td>
                                            {project.vigor}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Endurance</td>
                                        <td>
                                            {project.endurance}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Vitality</td>
                                        <td>
                                            {project.vitality}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Attunement</td>
                                        <td>
                                            {project.attunement}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Strength</td>
                                        <td>
                                            {project.strength}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Dexterity</td>
                                        <td>
                                            {project.dexterity}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Adaptability</td>
                                        <td>
                                            {project.adaptability}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Intelligence</td>
                                        <td>
                                            {project.intelligence}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Faith</td>
                                        <td>
                                            {project.faith}
                                        </td>
                                    </tr>

                                </table>
                            </div>
                            <h6 className="subTitulo" style={{ marginBottom: 10 }}>Classe Inicial</h6>
                            <p className="card-details">{project.initClass}</p>
                            <h6 className="subTitulo" style={{ marginBottom: 10 }}>Armas:</h6>
                            <p className="card-details">{project.armas}</p>
                            <h6 className="subTitulo" style={{ marginBottom: 10 }}>Armaduras:</h6>
                            <p className="card-details">{project.armaduras}</p>
                            <h6 className="subTitulo" style={{ marginBottom: 10 }}>Spells:</h6>
                            <p className="card-details">{project.spells}</p>
                            <h6 className="subTitulo" style={{ marginBottom: 10 }}>Aneis:</h6>
                            <p className="card-details">{project.anel}</p>
                            <h6 className="subTitulo" style={{ marginBottom: 10 }}>Comentários do autor:</h6>
                            <p className="card-details">{project.content}</p>
                            <div className="card-details" >
                                <h6 className="subTitulo" style={{ marginBottom: 10 }}>Informações:</h6>
                                <p>Autor: <Link to={"/user/" + project.authorId}>{project.authorFirstName} {project.authorLastName}</Link></p>
                                <div>{moment(project.createdAt.toDate()).calendar()}</div>

                            </div>
                            <div>
                                <h6 className="subTitulo" style={{ marginBottom: 10 }}>Você gostou dessa build?</h6>
                                <p className="grey-text">Vote com consciência, você só pode voltar uma vez</p>
                                <button id="votosPositivos" disabled={this.state.disabled} onClick={this.handleSubmit} className="btn-geral like" style={{
                                    marginRight: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>GOSTEI <i style={{ marginLeft: 10 }} className="fas fa-thumbs-up"></i></button>
                                <button id="votosNegativos" disabled={this.state.disabled} onClick={this.handleSubmit} className="btn-geral deslike" style={{
                                    marginRight: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>não gostei <i style={{ marginLeft: 10 }} className="fas fa-thumbs-down"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="container center">
                    <p>Loading project...</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {

    const id = ownProps.match.params.id

    const projects = state.firestore.data.projects
    const project = projects ? projects[id] : null
    return {
        project: project,
        auth: state.firebase.auth
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    const id = ownProps.match.params.id
    return {
        updateProject: (project) => dispatch(updateProject(project, id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {
            collection: 'projects'
        }
    ])
)(ProjectDetails)