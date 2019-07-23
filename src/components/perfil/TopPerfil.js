import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import fbConfig from '../../config/fbConfig'
import { updateCoverPic } from '../../store/actions/updateActions'

class TopPerfil extends Component {
    constructor() {
        super();
        this.state = {
            displayPic: 0,
            displayCover: 0,
            blur: 'blur(4px)',
            file: null,
            coverURL: '',
            alert: '',
            clicked: false,
        }
        this.setRef = ref => {
            this.file = ref;
        }
    }
    mouseEnter = (e) => {
        if (e.target.id === 'cover') {
            this.setState({ displayCover: 1 })
            this.setState({ displayPic: 0 })
        }
        if (e.target.id === 'pic') {
            this.setState({ displayPic: 1 })
            this.setState({ displayCover: 0 })
        }
    }
    mouseLeave = (e) => {
        this.setState({ displayCover: 0 })
        this.setState({ displayPic: 0 })
    }


    handleSubmit = (e) => {
        const { auth } = this.props
        e.preventDefault();
        // console.log(this.state)
        const file = this.file.files[0]
        this.setState({ clicked: true })
        const storageRef = fbConfig.storage().ref()
        const blob = file.slice(0, file.size, 'image/png');
        const newFile = new File([blob], `${'cover_' + auth.uid}`, { type: 'image/png' });
        console.log(newFile.name)
        const mainImage = storageRef.child('images/' + auth.uid + '/' + newFile.name)
        mainImage.put(file).then((snapshot) => {
            mainImage.getDownloadURL().then((url) => {
                this.props.updateCoverPic(url);
            })
        }
        )
        this.props.updateCoverPic(this.state.coverURL);
    }

    onChange = e => {

        switch (e.target.name) {
            // Updated this
            case 'selectedFile':
                if (e.target.files.length > 0) {
                    // Accessed .name from file 
                    this.setState({ fileName: e.target.files[0].name });
                    this.setState({ file: URL.createObjectURL(e.target.files[0]) });
                    if (e.target.files[0].size > 512000) {
                        this.setState({ alert: 'Esse arquivo é muito grande, tente outro até 500KB' })
                        this.value = "";
                    }
                    else {
                        this.setState({ alert: '' })
                    }
                }

                break;
            default:
                this.setState({ [e.target.name]: e.target.value });
        }
    };


    render() {
        const { profile, auth } = this.props;
        const profilePic = profile.profilePic
        const cover = profile.coverPic
        const { fileName } = this.state;
        const loc = window.location.pathname
        loc.toString()
        const id = loc.substring(loc.length - 28, loc.length);
        return (
            <div className="topPerfil">
                <div className="shellTopPerfil">
                    <div className="cover" style={{ background: `url(${this.state.file !== null ? this.state.file : cover ? cover : 'https://i.imgur.com/kYW5GdO.jpg'}) center/cover`, textDecoration: 'none', filter: `grayscale(${this.state.alert ? 1 : 0})` }}>
                        <div className="changePhotoText" style={{ position: 'absolute', top: 10, right: 20, display: 'flex', textDecoration: 'none', justifyContent: 'center', alignItems: 'center' }}>
                            <span style={this.state.displayCover === 0 ? { display: 'none' } : { opacity: this.state.displayCover, marginRight: 20, marginBottom: 8 }}>Trocar a imagem da capa</span>
                            <label for="file" className="fas fa-camera" style={{ fontSize: '18pt', marginBottom: '10px', cursor: 'pointer' }} id="cover" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}></label>
                            <input
                                id="file"
                                type="file"
                                name="selectedFile"
                                onChange={(event) => this.onChange(event)}
                                accept="image/*"
                                ref={this.setRef}
                            />
                        </div>
                        <h2 className="tituloProfile">{this.props.nome}</h2>
                        <Link to={"/profilepic/" + auth.uid} className="profilePic" style={{ background: `url(${profilePic ? profilePic : 'https://i.imgur.com/bmcT4FI.png'}) center/cover`, textDecoration: 'none', filter: 'grayscale(0) !important' }} id="pic" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                            <div className="changePhotoText" style={{ opacity: this.state.displayPic }}>
                                <i className="fas fa-camera" style={{ fontSize: '38pt', marginBottom: '10px' }}></i>
                                <span>Trocar a foto do perfil</span>
                            </div>
                        </Link>
                    </div>
                    <span style={this.state.alert !== '' ? { marginLeft: 30, color: 'red', float: 'right', fontSize: '18pt', marginTop: 20 } : { marginLeft: 30, color: 'rgb(58, 62, 80)', float: 'right' }}>{this.state.alert !== '' ? this.state.alert : null}</span>
                    <button className="btn-geral" style={this.state.file === null || this.state.alert !== '' || this.state.clicked === true ? { display: 'none' } : { display: 'flex', float: 'right' }} onClick={this.handleSubmit}>Atualizar capa</button>
                    <h2 className="tituloProfileResponsive">
                        {this.props.nome}
                    </h2>
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
        updateCoverPic: (url) => dispatch(updateCoverPic(url, uid))
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {
            collection: 'users'
        }
    ])
)(TopPerfil)