import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from './../../store/actions/authActions';
import { loadReCaptcha } from 'react-recaptcha-v3'
import { ReCaptcha } from 'react-recaptcha-v3'
import { MetaTags } from 'react-meta-tags';


class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    }
    componentDidMount(){
        loadReCaptcha('6LdVnqsUAAAAAFrufztmm7PScRhW26qnxakflMfS');
      }
    verifyCallback = (recaptchaToken) => {
        // Here you will get the final recaptchaToken!!!  
        // console.log(recaptchaToken, "<= your recaptcha token")
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state)

    }
    render() {
        const { auth, authError } = this.props
        if (auth.uid) return <Redirect to='/feed' />
        return (
            <div className="container">
                <MetaTags>
                    <meta name="theme-color" content="#FFF" />
                </MetaTags>
                <ReCaptcha
                            sitekey="6LdVnqsUAAAAAFrufztmm7PScRhW26qnxakflMfS"
                            action='action_name'
                            verifyCallback={this.verifyCallback}
                        />
                <div className="content">
                    <form onSubmit={this.handleSubmit} className="white">
                        <h5 className="tituloPage">Criar Conta</h5>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Senha</label>
                            <input type="password" id="password" onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="firstName">Primeiro nome</label>
                            <input type="text" id="firstName" onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="lastName">Segundo Nome</label>
                            <input type="text" id="lastName" onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            <button className="btn-geral">Criar conta</button>
                        </div>
                        <div className="red-text center">
                            {authError ? <p>{authError}</p> : null}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);