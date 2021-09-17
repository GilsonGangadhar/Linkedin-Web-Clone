import {auth, provider} from '../fire-base'
import { SET_USER} from './actionType'

export const setUser = (payload) => ({
    type : SET_USER, 
    user : payload, 
});

export function signInAPI(){
    return(dispatch) => {
        auth.signInWithPopup(provider)
        .then((payload) => {
            dispatch(setUser(payload.user))
        })
        .catch((error) => alert(error.messages));
    };
}

export function getUserAuth() {
    return(dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if(user) {
                dispatch(setUser(user))
            }
        })
    }
}

export function signOutAPI() {
    return(dispatch) => {
        auth.signOut()
        .then(()=> {
            dispatch(setUser(null))
        })
        .catch((error) => alert(error.messages))
    }
}