
// export const getRoomInfo = (jamId, roomId) => {
//     return (dispatch, getState, { getFirebase, getFirestore }) => {
        
//         const firestore = getFirestore();
//         return new Promise((resolve, reject) => {
//             firestore.collection('jams').doc(jamId)
//             .collection('rooms')
//             .doc(roomId)
//             .get()
//             .then(result => {
//                 console.log('result = ', result)
//                 const roomInfo = result;
//                 console.log.og(roomInfo)
//                 resolve(roomInfo);
//                 dispatch({
//                     type: "GET_JAMMER_INFO", 
//                     payload: roomInfo
//                 });
//             })
//         })
//         .catch((err) => {
//             dispatch({ type: 'GET_JAMMER_INFO_ERROR', err })
//         })

//     }
    
// }

export const setRoomId = (roomId) => {
    console.log('SET ROOM ID LAUNCHED', roomId)
    return  {
        type: "ROOM_ID", 
        payload: roomId
    }
};



