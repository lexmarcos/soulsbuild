import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from "react-redux-firebase";
import updateReducer from "./updateReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    update: updateReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});



export default rootReducer
