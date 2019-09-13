// const initState = {
//     userJams: [
//         {
//         jamId: 1234,
//         jamName: 'Cooles Jam on Earth',
//         createdAt: new Date(),
//         }
//     ]
// };


const jamReducer = (state = [], action) => {
    switch(action.type) {
        case 'CREATE_JAM':
            return {
                ...state
            }
        case 'CREATE_JAM_ERROR':
            return {
                ...state
            }
        case 'JOIN_JAM':
            return {
                ...state
            }
        case 'JOIN_JAM_ERROR':
            return {
                ...state
            }
        case 'JAM_SELECTED':
            return {
                ...state
            }
        case 'GET_USER_JAMS':
            return action.payload;
        default:
            return state
    }
};

export default jamReducer;