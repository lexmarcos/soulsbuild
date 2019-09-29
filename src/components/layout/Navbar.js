import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import SingnedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import SignedInLinks from './SignedInLinks';
import logo from '../../img/logo-blackk.png'
import logowhite from '../../img/logo-off.png'

class Navbar extends Component {
    state = {
        clicked: false,
        path: ''
    }

    style = {
        textBlack: {
            display: 'block',
            color: '#253858 !important',
            textAlign: 'center',
            padding: '14px 16px',
            textDecoration: 'none !important'
        },
        textWhite: {
            display: 'block',
            color: '#FFF !important',
            textAlign: 'center',
            padding: '14px 16px',
            textDecoration: 'none !important'
        },
        black: {
            color: '#253858 !important',
        },
        white: {
            color: '#FFF !important',
        }
    }
    componentDidMount() {
        this.setState({ clicked: false })
    }
    handleClicked = () => {
        const loc = window.location.pathname
        if (this.state.clicked === false) {
            this.setState({ clicked: true })
            this.setState({ path: loc })

        }
        else {
            this.setState({ clicked: false })
            return null
        }
    }
    linkClicked = () => {
        this.setState({ clicked: false })
    }
    render() {
        const { auth, profile } = this.props
        const links = auth.uid ? <SignedInLinks profile={profile} /> : <SingnedOutLinks />
        const location = window.location.pathname
        const changeColor = () => {
            if (auth.isEmpty || location === '/' || location === '/signin' || location === '/signup') {
                return { background: '#FFF' }
            }
            if (!auth.isEmpty) {
                return { backgroundImage: 'linear-gradient(120deg, #d076ff 0%, #72b9ff 100%', boxShadow: '0px 2px 14px #4f6a9257 !important' }
            }
        }
        return (

            <div>
                <nav className={`navbar ${this.state.clicked === true ? 'navbarResponsive' : ''}`} style={changeColor()}>
                    <div className="container">
                        <ul>
                            <Link to="/" className={`brand-logo ${auth.isEmpty ? ' linkBlack' : ' linkWhite '}`} style={auth.isEmpty ? this.style.textBlack : this.style.textWhite}>
                                <span style={{ display: "flex", justifyContent: 'center', alignItems: "center" }}><img style={{ marginRight: "10px" }} src={auth.isEmpty ? logo : logowhite} alt="" width="12px" />
                                    <span style={auth.isEmpty ? this.style.black : this.style.black}>Souls Build</span>
                                </span>
                            </Link>
                            <div className="linksNavBar">
                                {links}
                            </div>
                            <li className={`${auth.isEmpty ? ' linkBlack' : ' linkWhite '} menuResponsive`} onClick={this.handleClicked} style={auth.isEmpty ? this.style.textBlack : this.style.textWhite}><i className={`fas fa-${this.state.clicked === false ? `bars` : `times`}`}></i></li>
                            <div style={this.state.clicked === false ? { display: 'none' } : { display: 'block' }} >
                                <div className="responsiveLinks">
                                    <span onClick={this.linkClicked}>{links}</span>
                                </div>
                            </div>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

export default connect(mapStateToProps)(Navbar);