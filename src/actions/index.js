import {auth, provider, storage} from '../fire-base'
import db from '../fire-base'
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

export function postArticleAPI(payload) {
    return(dispatch) => {
        if(payload.image != ''){
            const upload = storage.ref(`images/${payload.image.name}`).put(payload.image);

        upload.on('state_changed', snapshot => {
            const progress = ((snapshot.bytesTransfered / snapshot.totalBytes) * 100) 
            console.log(`Progess : ${progress}%`)
            if(snapshot.state === 'RUNNING'){
                console.log(`Progress: ${progress}%`)
            }
        }, error => console.log(error.code), 
        async() => {
            const downloadURL = await upload.snapshot.ref.getDownloadURL();
            db.collection('articles').add({
                actor : {
                    description : payload.user.email,
                    title : payload.user.displayName,
                    date : payload.timestamp, 
                    image : payload.user.photoURL
                },
                video : payload.video,
                sharedImg : downloadURL,
                comments : 0, 
                description : payload.description
            })
        }
        )
        
        }
    }
}