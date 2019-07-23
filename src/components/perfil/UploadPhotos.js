import React, { Component } from 'react';
import fbConfig from '../../config/fbConfig'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { updateProfilePic } from '../../store/actions/updateActions'
import { Redirect } from 'react-router-dom';
class UploadProfilePic extends Component {

    constructor() {
        super();
        this.state = {
            avatarURL: '',
            clicked: false,
            fileName: '',
            file: null,
            alert: ''
        }
        this.setRef = ref => {
            this.file = ref;
        }
    }

    handleSubmit = (e) => {
        const { auth } = this.props
        e.preventDefault();
        // console.log(this.state)
        const file = this.file.files[0]
        this.setState({ clicked: true })
        const storageRef = fbConfig.storage().ref()
        const blob = file.slice(0, file.size, 'image/png');
        const newFile = new File([blob], auth.uid, { type: 'image/png' });
        console.log(newFile.name)
        const mainImage = storageRef.child('images/' + auth.uid + '/' + newFile.name)
        mainImage.put(file).then((snapshot) => {
            mainImage.getDownloadURL().then((url) => {
                this.props.updateProfilePic(url);
            })
        }
        )
        this.props.updateProfilePic(this.state.avatarURL);
        this.props.history.push('/perfil/' + auth.uid);
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
        const { auth, profile } = this.props;
        const { fileName } = this.state;
        const profilePic = profile.profilePic
        const loc = window.location.pathname
        loc.toString()
        const id = loc.substring(loc.length - 28, loc.length);
        if (auth.uid !== id) return <Redirect to={'/perfil/' + auth.uid} />
        return (
            <div className="updatePic container">
                <div className="white">
                    <span className="card-title">Nova foto do perfil</span>
                    <center>
                        <div className="profilePicUpdate" style={{ background: `url(${this.state.file === null ? profilePic : this.state.file}) center/cover`, marginTop: '50px', marginBottom: '50px', filter: `grayscale(${this.state.alert === '' ? 0 : 1})`}} />
                        <div className="profileInput">
                            <label
                                style={fileName === '' ? {padding: '10px 15px'} : this.state.alert === '' ? { backgroundImage: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)', textShadow: '#00000059 0px 2px 4px', padding: '10px 15px', boxShadow: '0 18px 40px -5px #bbf389'} :
                                    { backgroundImage: 'linear-gradient(to right, #ed213a, #93291e)', textShadow: '#00000059 0px 2px 4px', boxShadow: '0 18px 40px -5px #ed213a94', padding: '10px 15px' } }
                                className="btn-geral"
                                for="file">
                                {fileName === '' ? 'Selecione um arquivo' : this.state.alert === '' ? 'Arquivo carregado' : 'Selecione outro aqui'}
                                <i
                                    style={fileName === '' ? { opacity: 0, display: 'none' } : { opacity: 1, marginLeft: 10 }}
                                    class={`fas fa-${this.state.alert !== '' ? `times` : `check`}`}>
                                </i>
                            </label>
                            <input
                                id="file"
                                type="file"
                                name="selectedFile"
                                onChange={(event) => this.onChange(event)}
                                accept="image/*"
                                ref={this.setRef}
                            />
                            <span style={this.state.alert !== '' ? { marginLeft: 30, color: 'red' } : { marginLeft: 30, color: 'rgb(58, 62, 80)' }}>{this.state.alert !== '' ? this.state.alert : fileName}</span>
                        </div>
                    </center>
                    <button className="btn-geral" disabled={fileName === '' || this.state.clicked === true || this.state.alert !== '' ? true : false} onClick={this.handleSubmit}>Enviar</button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const uid = ownProps.match.params.uid
    return {
        updateProfilePic: (url) => dispatch(updateProfilePic(url, uid))
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
)(UploadProfilePic)