import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { updateUser } from '../../store/actions/updateActions'
class editPerfil extends Component {
    state = {
        fGame: '',
        fClass: '',
        fBuild: '',
        fWeapon: '',
        fShield: '',
    }
    render() {
        const { user } = this.props
        let profilePic = ''
        let name = ''
        try {
            name = user.firstName + " " + user.lastName
            profilePic = user.profilePic
        } catch (e) {
            console.log("loading...");
        }
        return (
            <div className="editPerfil container">
                <div className="white">
                    <h1 className="tituloCard">Editar Perfil</h1>
                    <center><div className="profilePicUpdate" style={{ background: `url(${profilePic}) center/cover` }}></div></center>
                    <div className="inputArea">
                        <div className="input-field">
                            <label htmlFor="title">Nome completo</label>
                            <input type="text" id="title" value={`${name}`} disabled onKeyDown={this.keyPressed} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="title">Jogo Favorito</label>
                            <select type="text" id="title" onKeyDown={this.keyPressed} >
                                <option value="valor1">Dark Souls 1</option>
                                <option value="valor2" selected>Dark Souls 2</option>
                                <option value="valor3">Dark Souls 3</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    const loc = window.location.pathname
    loc.toString()
    const uid = loc.substring(loc.length - 28, loc.length)
    return {
        updateUser: (url) => dispatch(updateUser(url, uid))
    }
}


const mapStateToProps = (state) => {
    const loc = window.location.pathname
    loc.toString()
    const uid = loc.substring(loc.length - 28, loc.length)
    const users = state.firestore.data.users
    const user = users ? users[uid] : null
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        user: user
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(editPerfil)