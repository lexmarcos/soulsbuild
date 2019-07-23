import React, { Component } from 'react';
import SignedInLinks from './SignedInLinks'
import SingnedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';

class ResponsiveLinks extends Component {
    state = {  }
    render() { 
        const { auth, profile } = this.props
        const links = auth.uid ? <SignedInLinks profile={profile} /> : <SingnedOutLinks />
        return (
            <div className="responsiveLinks">
                {links}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}
 
export default connect(mapStateToProps)(ResponsiveLinks);