
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
            });
        })
        .catch((err) => {
            dispatch({ type: 'GET_USER_JAMS_ERROR', err })
        })

    }
}




