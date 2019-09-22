// adding data to Firestore: https://www.youtube.com/watch?v=JA1Z0u4dr0E

export const createJam = (jam) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        // retornamos una función gracias al redux-thunk
        const firestore = getFirestore();

        // usamos el método getState() para tomar info del state
        // en este caso el state almacenado en "firebase.profile"
        const profile = getState().firebase.profile;

        // y en este caso el state almacenado en "firebase.profile"
        const userId = getState().firebase.auth.uid;
        firestore.collection('jams').add({...jam,})
        .then(() => {
            dispatch({type: 'CREATE_JAM', jam });

        }).catch((err) => {
            dispatch({ type: 'CREATE_JAM_ERROR', err })
        })

        firestore.collection('user').doc(userId).collection('userJams').add({...jam})
        .then(() => {
            dispatch({type: 'ADD_JAM_TO_USER', jam})
        }).catch((err) => {
            dispatch({ type: 'ADD_JAM_TO_USER_ERROR', err })
        })
    }
};

export const addJamToUser = (jam) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        // retornamos una función gracias al redux-thunk
        const firestore = getFirestore();
        // y en este caso el state almacenado en "firebase.profile"
        const userId = getState().firebase.auth.uid;
        firestore.collection('user').doc(userId).collection('userJams').add({...jam})
        .then(() => {
            dispatch({type: 'ADD_JAM_TO_USER', jam})
        }).catch((err) => {
            dispatch({ type: 'ADD_JAM_TO_USER_ERROR', err })
        })
    }
};

export const getUserJams = (userId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        
        const firestore = getFirestore();

        firestore.collection('users').doc(userId).collection('userJams').get()
        .then(function(querySnapshot) {
            const userJams = []
            querySnapshot.forEach(function(doc) {
                userJams.push(doc.data())
                return userJams
            });
           dispatch({
                type: "GET_USER_JAMS", 
                payload: userJams
            })
        })
        .catch((err) => {
            dispatch({ type: 'GET_USER_JAMS_ERROR', err })
        })

    }
}

// AÑADIR EL USER ID AL JAMMERS
export const joinJam = (jam) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        // retornamos una función gracias al redux-thunk
        const firestore = getFirestore();

        // y en este caso el state almacenado en "firebase.profile"
        const userId = getState().firebase.auth.uid;
        const profile = getState().firebase.profile;

        const userInfo = {
            userName: profile.userName,
            userSurname: profile.userSurname,
            userId: userId
        };

        firestore.collection('jams').doc(jam.id).collection('jammers').add({userInfo})
        .then(() => {
            dispatch({type: 'ADD_USER_TO_JAMMERS', jam})
        }).catch((err) => {
            dispatch({ type: 'ADD_USER_TO_JAMMERS_ERROR', err })
        })
    }
};

