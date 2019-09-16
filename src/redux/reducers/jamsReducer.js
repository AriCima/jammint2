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
            return action.payload;
        case 'JAM_SECTION':
            return action.payload;
        case 'GET_USER_JAMS':
            return action.payload;
        case 'GET_JAM_INFO_BY_ID':
            return action.payload;
        case 'GET_JAM_INFO_BY_CODE':
            return action.payload;
        default:
            return state
    }
};

export default jamReducer;