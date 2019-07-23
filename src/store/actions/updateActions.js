export const updateProject = (project, id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();
        const x = getState().firestore.data.projects[id].votos
        const authorId = getState().firebase.auth.uid
        const usersVotes = getState().firestore.data.projects[id].usersVote
        const newVotes = usersVotes.concat(authorId)
        // console.log(newVotes)
        const votos = project.votos
        var votosUpdate = null
        if (votos === 'positivo') {
            votosUpdate = x + 1
        }
        if (votos === 'negativo') {
            votosUpdate = x - 1
        }
        firestore.collection('projects').doc(id).update({
            votos: x + project,
            usersVote: newVotes

        }).then(() => {
            dispatch({ type: 'UPDATE_PROJECT', project });
        }).catch((err) => {
            dispatch({ type: 'UPDATE_PROJECT_ERROR', err })
        })
    }
}

export const updateProfilePic = (url, uid) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        console.log(url)
        firestore.collection('users').doc(uid).update({
            profilePic: url
        }).then(() => {
            dispatch({ type: 'UPDATE_PROFILE_PIC', url });
        }).catch((err) => {
            dispatch({ type: 'UPDATE_PROFILE_PIC_ERROR', err })
        })
    }
}

export const updateCoverPic = (url, uid) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        console.log(url)
        firestore.collection('users').doc(uid).update({
            coverPic: url
        }).then(() => {
            dispatch({ type: 'UPDATE_COVER_PIC', url });
        }).catch((err) => {
            dispatch({ type: 'UPDATE_COVER_PIC_ERROR', err })
        })
    }
}




