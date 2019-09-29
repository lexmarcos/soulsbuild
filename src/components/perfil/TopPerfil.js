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
            key: 4,
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
    // Função para deixar a profilePic preto e branca quando o mouse passar
    // sobre ela
    mouseEnter = (e) => {
        // Condição para caso seja a capa do perfil
        if (e.target.id === 'cover') {
            this.setState({ displayCover: 1 })
            this.setState({ displayPic: 0 })
        }
        // Condição para caso seja a foto do perfil
        if (e.target.id === 'pic') {
            this.setState({ displayPic: 1 })
            this.setState({ displayCover: 0 })
        }
    }
    // Função que retira o preto e branco quando o mouse sai das fotos
    mouseLeave = (e) => {
        this.setState({ displayCover: 0 })
        this.setState({ displayPic: 0 })
    }

    // Envia a foto pora o banco de dados
    handleSubmit = (e) => {
        // Pega o uid do usuário atual
        const { auth } = this.props
        e.preventDefault();
        // Guarda o arquivo enviado na variável file
        const file = this.file.files[0]
        // Variavel que é ativada pra evitar novos clicks no botão depois do envio
        this.setState({ clicked: true })
        // conecta no ao firebase
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
        const { auth, user } = this.props;
        let profilePic = ''
        let coverPic = ''
        let name = ''
        let isVerified = ''
        try {
            name = user.firstName + " " + user.lastName
            profilePic = user.profilePic
            coverPic = user.coverPic
            isVerified = user.isVerified
            console.log(isVerified)
        } catch (e) {
            console.log("loading...");
        }
        const loc = window.location.pathname
        loc.toString()
        console.log(this.user)
        const id = loc.substring(loc.length - 28, loc.length);
        return (
            <div className="topPerfil">
                <div className="shellTopPerfil">
                    <div className="cover" style={{ background: `url(${this.state.file !== null ? this.state.file : coverPic ? coverPic : 'https://i.imgur.com/t5yvOZ5.gif'}) center/cover`,
                     textDecoration: 'none',
                    backgroundSize: `${this.state.file !== null ? null : coverPic ? null : '200px'}`,backgroundRepeat: 'no-repeat',
                    filter: `grayscale(${this.state.alert ? 1 : 0})` }}>
                        {id === auth.uid ? <div className="changePhotoText" style={{ position: 'absolute', top: 10, right: 20, display: 'flex', textDecoration: 'none', justifyContent: 'center', alignItems: 'center' }}>
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
                        </div> : null}
                        <h2 className="tituloProfile">{name} <i class="material-icons verified-user" style={{color: "#4984d6", display: `${isVerified ? 'contents' : 'none'}`}}>verified_user</i></h2>
                        
                            {id === auth.uid ?
                            <Link to={"/profilepic/" + auth.uid} className="profilePic" style={{ background: `url(${profilePic ? profilePic : 'https://i.imgur.com/t5yvOZ5.gif'}) center/cover`, textDecoration: 'none', filter: 'grayscale(0) !important' }} id="pic" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                <div className="changePhotoText" style={{ opacity: this.state.displayPic }}>
                                    <i className="fas fa-camera" style={{ fontSize: '38pt', marginBottom: '10px' }}></i>
                                    <span>Trocar a foto do perfil</span>
                                </div>
                            </Link> : <div className="profilePicOtherUser" style={{ background: `url(${profilePic ? profilePic : 'https://i.imgur.com/t5yvOZ5.gif'}) center/cover`, textDecoration: 'none', filter: 'grayscale(0) !important' }} id="pic"/>}
                        
                    </div>
                    <span style={this.state.alert !== '' ? { marginLeft: 30, color: 'red', float: 'right', fontSize: '18pt', marginTop: 20 } : { marginLeft: 30, color: 'rgb(58, 62, 80)', float: 'right' }}>{this.state.alert !== '' ? this.state.alert : null}</span>
                    <button className="btn-geral" style={this.state.file === null || this.state.alert !== '' || this.state.clicked === true ? { display: 'none' } : { display: `${window.innerWidth < 600 ? '' : 'flex'}`, float: `${window.innerWidth < 600 ? 'none' : 'right'}`, marginTop: `${window.innerWidth < 600 ? '120px' : ''}` }} onClick={this.handleSubmit}>Atualizar capa</button>
                    <h2 className="tituloProfileResponsive">
                        {name} <i class="material-icons verified-user" style={{color: "#4984d6", display: `${isVerified ? 'contents' : 'none'}`}}>verified_user</i>
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
)(TopPerfil)