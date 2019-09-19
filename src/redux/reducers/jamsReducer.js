const jamsReducer = (state = [], action) => {
    switch(action.type) {
        case 'CREATE_JAM':
            return action.payload;

        case 'CREATE_JAM_ERROR':
            return action.payload;

        case 'ADD_JAM_TO_USER':
            return action.payload;

        case 'ADD_JAM_TO_USER_ERROR':
            return action.payload;

        case 'JOIN_JAM':
            return action.payload;

        case 'JOIN_JAM_ERROR':
            return action.payload;

        case 'GET_USER_JAMS':
            return action.payload;

        default:
            return state
    }
};

export default jamsReducer;