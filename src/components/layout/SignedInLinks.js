import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions'

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
        }
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
            <li><NavLink style={location !== "/" && location !== "/signin" && location !== "/signup" ? this.style.textWhite : this.style.textBlack} to={"/perfil/" + auth.uid}>
                {this.props.profile.initials}
            </NavLink></li>
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