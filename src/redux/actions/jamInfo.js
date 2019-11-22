// export const getJamInfo = (jamId) => {
//     //console.log('getJamInfo triggered with: ', jamId)
//     if(!jamId){
//         return 
//     } else { 
//         return (dispatch, getState, { getFirebase, getFirestore }) => {
            
//             const firestore = getFirestore();

//             firestore.collection('jams').doc(jamId).get()
//             let jamInfo = {}
//             .then((res) => {
//                 jamInfo = res;
//                 //console.log('res = ', res)
//                 return jamInfo
//                 // setJamActiveSection(res.sections[0]);
//                 // setJamSections(res.sections);
//                 // setJamName(res.jamName)
//                 // setJamType(res.jamType)
//             });
//             dispatch({
//                 type: "GET_JAM_INFO", 
//                 payload: jamInfo
//             });
            

//         }
//     }
// }

import DataService from '../../Components/services/DataService';

// COMO ESTOY USANDO THUNK MIDDLEWARE, 
// LA ACCION PUEDE DEVOLVER UNA FUNCION
export const getJamInfo = (jamId) => async (dispatch) => {
    const response = await DataService.getJamInfoById(jamId);
        
    dispatch({ 
        type: "GET_JAM_INFO", 
        payload: response 
    });
};

