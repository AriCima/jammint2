// const jamInfoReducer = (state = {}, action) => {
//     switch(action.type) {
//         case 'GET_JAM_INFO':
//             return action.payload;
//         default:
//             return state
//     }
// };

// export default jamInfoReducer;


// Éste reducer mantiene el listado de posts
// que obtenemos del jasonAPI, por eso lo inicializo
// como un array.

const jamInfoReducer = (state = [], action) => {
    // sintaxis deseable
    switch (action.type) {
        case 'GET_JAM_INFO':
            return action.payload;
        default: 
            return state;
    }
};

export default jamInfoReducer;