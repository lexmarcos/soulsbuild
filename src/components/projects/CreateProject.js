import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/projectActions';
import { Redirect } from 'react-router-dom';

class CreateProject extends Component {
    state = {
        title: '',
        content: '',
        contador: 0,
        level: '',
        vigor: '',
        endurance: '',
        vitality: '',
        attunement: '',
        strength: '',
        dexterity: '',
        adaptability: '',
        intelligence: '',
        faith: '',
        votos: 0,
        usersVote: [],
        initClass: '',
        aneis: '',
        armas: '',
        spells: '',
        armaduras: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state)
        this.props.createProject(this.state);
        this.props.history.push('/feed');
    }
    componentDidMount() {
        this.setState({ contador: 0 })

    }
    progress = () => {
        this.setState({
            contador: this.state.contador + 1
        })
    }
    keyPressed (e){
        if(e.keyCode === 13) 
            e.preventDefault()
        else{
            return null
        }
    }
    progressForm = () => {
        switch (this.state.contador) {
            case 0:
                return (
                    <div>
                        <h6 className="subTitulo">1° Insira o nome da sua build</h6>
                        <div className="input-field">
                            <label htmlFor="title">Nome da build</label>
                            <input type="text" id="title" onChange={this.handleChange} disabled={this.props.auth.emailVerified ? false : true} onKeyDown={this.keyPressed}/>
                        </div>
                        <span className="red-text">{!this.props.auth.emailVerified ? "Você precisa verificar seu email para criar uma nova build" : null}</span>
                    </div>
                )
            case 1:
                return (
                    <div>
                        <h6 className="subTitulo">2° informe os atributos</h6>
                        <table className="tableAtributos">
                            <tr>
                                <th>Atributo</th>
                                <th>Pontos</th>
                            </tr>
                            <tr>
                                <td>Level recomendado</td>
                                <td>
                                    <input className="inputTable" type="number" id="level" onChange={this.handleChange} onKeyDown={this.keyPressed}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Vigor</td>
                                <td>
                                    <input className="inputTable" type="number" id="vigor" onChange={this.handleChange} onKeyDown={this.keyPressed}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Endurance</td>
                                <td>
                                    <input className="inputTable" type="number" id="endurance" onChange={this.handleChange} onKeyDown={this.keyPressed}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Vitality</td>
                                <td>
                                    <input className="inputTable" type="number" id="vitality" onChange={this.handleChange} onKeyDown={this.keyPressed}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Attunement</td>
                                <td>
                                    <input className="inputTable" type="number" id="attunement" onChange={this.handleChange} onKeyDown={this.keyPressed}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Strength</td>
                                <td>
                                    <input className="inputTable" type="number" id="strength" onChange={this.handleChange} onKeyDown={this.keyPressed}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Dexterity</td>
                                <td>
                                    <input className="inputTable" type="number" id="dexterity" onChange={this.handleChange} onKeyDown={this.keyPressed}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Adaptability</td>
                                <td>
                                    <input className="inputTable" type="number" id="adaptability" onChange={this.handleChange} onKeyDown={this.keyPressed}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Intelligence</td>
                                <td>
                                    <input className="inputTable" type="number" id="intelligence" onChange={this.handleChange} onKeyDown={this.keyPressed}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Faith</td>
                                <td>
                                    <input className="inputTable" type="number" id="faith" onChange={this.handleChange} onKeyDown={this.keyPressed}/>
                                </td>
                            </tr>
                        </table>
                    </div>
                )
            case 2:
                return(
                    <div>
                    <h6 className="subTitulo">3° Adicione itens se necessário</h6>
                    <div className="input-field">
                        <label htmlFor="title">Classe Inicial</label>
                        <input type="text" id="initClass" onChange={this.handleChange} onKeyDown={this.keyPressed}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">Armas</label>
                        <input type="text" id="armas" onChange={this.handleChange} onKeyDown={this.keyPressed}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">Armaduras</label>
                        <input type="text" id="armaduras" onChange={this.handleChange} onKeyDown={this.keyPressed}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">Spells</label>
                        <input type="text" id="spells" onChange={this.handleChange} onKeyDown={this.keyPressed}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">Aneis</label>
                        <input type="text" id="anel" onChange={this.handleChange} onKeyDown={this.keyPressed}/>
                    </div>
                </div>
                )
            case 3:
                return (
                    <div>
                        <h6 className="subTitulo">4° Faça algum comentário pra melhorar a sua build</h6>
                        <div className="input-field">
                            <label htmlFor="content">Conteúdo</label>
                            <textarea className="materialize-textarea" id="content" onChange={this.handleChange} onKeyDown={this.keyPressed}/>
                        </div>
                        <button className="btn-geral" >Criar Build</button>
                    </div>
                )
            default:
                return (
                    <p>ERROR</p>
                )
        }
    }
    verifyText() {
        switch (this.state.contador) {
            case 0:
                if (this.state.title === '' || !this.props.auth.emailVerified) {
                    return true
                }
                else {
                    return false
                }
            case 1:
                if (this.state.level === '' || this.state.vigor === '' || this.state.endurance === '' || this.state.vitality === '' || this.state.attunement === '' || this.state.strength === ''
                    || this.state.dexterity === '' || this.state.adaptability === '' || this.state.intelligence === '' || this.state.faith === ''
                ) {
                    return true
                }
                else {
                    return false
                }
            default:
                return false
        }
    }
    render() {
        const { auth } = this.props
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
                <div className="content">
                    <div className="white">
                        <form onSubmit={this.handleSubmit}>
                            <h5 className="tituloPage">Criar uma build</h5>
                            <div className="progress" style={this.state.contador === 0 ? { width: '10%' } : this.state.contador === 1 ? { width: '30%' } : this.state.contador === 2 ? { width: '50%' } : this.state.contador === 3 ? { width: '90%' } : { width: '100%' }} />
                            {this.progressForm()}
                        </form>
                        {this.state.contador <= 2 ? <button onClick={this.progress} disabled={this.verifyText()} className="btn-geral">Próximo</button> : null}
                        
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);