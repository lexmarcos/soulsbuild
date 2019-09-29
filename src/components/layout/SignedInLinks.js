import React, { Component } from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions'
import TopPerfil from '../perfil/TopPerfil'

class SingnedInLinks extends Component {
    state = {
        path: false
    }
    
    style = {
        textBlack: {
            display: 'block',
            color: '#253858 !important',
            textAlign: 'center',
            padding: '14px 16px',
            textDecoration: 'none'
        },
        textWhite: {
            display: 'block',
            color: '#FFF',
            textAlign: 'center',
            padding: '14px 16px',
            textDecoration: 'none'
        },
        textProfilePic: {
            display: 'flex',
            color: '#FFF',
            textAlign: 'center',
            padding: '9px 16px',
            textDecoration: 'none',
            alignItems: 'center',
            justifyContent: 'center'
        },
    }
    
    render() {
        const location = window.location.pathname
        const { auth } = this.props;
        // console.log(auth)
    return (
        <div>
            <li><NavLink style={location !== "/" && location !== "/signin" && location !== "/signup" ? this.style.textWhite : this.style.textBlack} onClick={this.props.signOut} to="">Sair</NavLink></li>
            <li><NavLink style={location !== "/" && location !== "/signin" && location !== "/signup" ? this.style.textWhite : this.style.textBlack} to="/create">Nova build</NavLink></li>
            <li><NavLink style={location !== "/" && location !== "/signin" && location !== "/signup" ? this.style.textWhite : this.style.textBlack} to="/melhores">Melhores builds</NavLink></li>
            <li><Link style={location !== "/" && location !== "/signin" && location !== "/signup" ? this.style.textProfilePic : this.style.textBlack} onClick={this.reload} to={"/perfil/" + auth.uid}>
                <div class="profilePicNav" style={{background: `url(${this.props.profile.profilePic}) center/cover`}}></div>{this.props.profile.firstName}
            </Link></li>
        </div>
    )
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingnedInLinks)