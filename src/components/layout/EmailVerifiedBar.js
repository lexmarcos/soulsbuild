import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reSendVerification } from './../../store/actions/authActions';

class EmailVerifiedBar extends Component {
    state = {
        clicked: false
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.reSendVerification()
        this.setState({clicked: true})
    }

    render() {
        const { auth, profile } = this.props
        // console.log(auth)
            if (!auth.isEmpty && !auth.emailVerified) {
                return (
                    <nav className="emailError" style={{ background: '#f54242' }}>
                        <p>Olá {profile.firstName}, para sua segurança e também da plataforma, foi enviado um email para autenticar sua conta. Para criar builds, verifique-o
                            </p>
                        <button className="btn-normal" 
                        onClick={this.handleSubmit} 
                        style={{ marginLeft: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', color: `${this.state.clicked === true ? "#FFF " : 'black'}`}} 
                        disabled={this.state.clicked === true ? true : false}>{this.state.clicked === true ? 'Solicitação enviada ' : 'Enviar nova verificação'} 
                        <i style={this.state.clicked === true ? {display: 'flex', marginLeft: '20px'} : {display: 'none'}} 
                        class="fas fa-check"></i></button>
                    </nav>
                )
            }
        else {
            return null
        }
    }
}



const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reSendVerification: () => dispatch(reSendVerification())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerifiedBar);