
export const getUserJams = (userId) => {

    if(!userId){
        return 
    } else { 
        return (dispatch, getState, { getFirebase, getFirestore }) => {
            
            const firestore = getFirestore();

            firestore.collection('users').doc(userId).collection('userJams').get()
            .then(function(querySnapshot) {
                const userJams = []
                querySnapshot.forEach(function(doc) {
                    let j = doc.id;
                    let newData = doc.data();
                    newData.jamId = j;
                    userJams.push(newData)
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
}



