import React, { Component } from 'react';
import { connect } from 'react-redux'
import { signIn } from './../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
import logo from '../../img/logo.png'
import { loadReCaptcha } from 'react-recaptcha-v3'
import { ReCaptcha } from 'react-recaptcha-v3'
import { MetaTags } from "react-meta-tags";

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
    }
    componentDidMount() {
        loadReCaptcha('6LdVnqsUAAAAAFrufztmm7PScRhW26qnxakflMfS');
    }
    verifyCallback = (recaptchaToken) => {
        // Here you will get the final recaptchaToken!!!  
        // console.log(recaptchaToken, "<= your recaptcha token")
    }
    render() {
        const { authError, auth } = this.props
        if (auth.uid) return <Redirect to='/feed' />
        return (
            <div className="container">
                <MetaTags>
                    <meta name="theme-color" content="#FFF" />
                </MetaTags>
                <div className="content">
                    <form onSubmit={this.handleSubmit} className="white">
                        <center>
                            <img src={logo} alt="" width="100px" />
                            <h5 className="tituloPage">Entrar</h5>
                        </center>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange={this.handleChange} placeholder="example@example.com" />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Senha</label>
                            <input type="password" id="password" onChange={this.handleChange} placeholder="Senha de 6 digitos" />
                        </div>
                        <center>
                            <div className="red-text">
                                {authError ? <p>{authError}</p> : null}
                            </div></center>
                        <div className="input-field">
                            <button className="btn-geral">Login</button>
                        </div>
                        <ReCaptcha
                            sitekey="6LdVnqsUAAAAAFrufztmm7PScRhW26qnxakflMfS"
                            action='action_name'
                            verifyCallback={this.verifyCallback}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);