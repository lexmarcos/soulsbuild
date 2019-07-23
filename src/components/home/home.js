import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { MetaTags } from 'react-meta-tags';
class Home extends Component {
    state = {  }
    render() {
        const {auth} = this.props
        if (auth.uid) return <Redirect to='/feed' />
        return (
            <div className="home">
                <MetaTags>
                    <meta name="theme-color" content="#FFF" />
                </MetaTags>
                <div className="homeResponsive"></div>
                <div className="textLeft">
                    <h1>Souls Build</h1>
                    <p className="grey-text">A melhor forma de criar, compartilhar e conhecer builds
                        da serie Souls. Todas as ferramentas para facilitar a criação de buids juntos em um
                        só site, faça sua conta e aproveite
                    </p>
                    <Link to="/signup" className="btn-geral" style={{textDecoration: 'none'}}>Criar Conta</Link>
                </div>
            </div>
        );
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
    )(Home)