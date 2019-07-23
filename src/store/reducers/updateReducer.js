const initState = {
    projects: [
        { id: '1', title: 'help me find peach', content: 'blah blah blah' },
        { id: '2', title: 'collect all the stars', content: 'blah blah blah' },
        { id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah' }
    ]
}
const updateReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_PROJECT':
            console.log("updated project", action.project)
            return state;
        case 'UPDATE_PROJECT_ERROR':
            console.log('update project error', action.err)
            return state;
        case 'UPDATE_PROFILE_PIC':
            console.log("updated profile pic", action.project)
            return state;
        case 'UPDATE_PROFILE_PIC_ERROR':
            console.log('update profile pic error', action.err)
            return state;
        default:
            return state;
    }
}

export default updateReducer