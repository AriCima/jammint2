import firebase from 'firebase';

export const getJamInfoById = (jamId) => {
    return (dispatch) => {
        
        firebase.firestore().collection('jams').doc(jamId).get()
        .then((result) => {
            console.log('el result del Bis = ', result);
            const jamInfo = result.data();
            dispatch({
                type: "GET_JAM_INFO_BY_ID", 
                payload: jamInfo
            })
        })

        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('Error al cargar la JamInfo: ', errorCode, errorMessage);
            dispatch({ 
                type: 'GET_JAM_INFO_BY_ID_ERROR', 
                payload: errorMessage 
            })
        })


    }
}

export const getJamInfoByCode = (jamId, jamCode) => {
    return (dispatch, { getFirestore }) => {
        
        const firestore = getFirestore();

        firestore.collection('jams').doc(jamId).where('jamCode', '==', jamCode).get()
        .then((result) => {
            // console.log('el result del Bis = ', result);
            const jamInfo = result.data();
            dispatch({
                type: "GET_JAM_INFO_BY_CODE", 
                payload: jamInfo
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('Error al cargar la JamInfo: ', errorCode, errorMessage);
            dispatch({ 
                type: 'GET_JAM_INFO_BY_CODE_ERROR', 
                payload: errorMessage 
            })
        })

    }
}
