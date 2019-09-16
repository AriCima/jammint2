const jamInfoReducer = (state = [], action) => {
    switch(action.type) {
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

export default jamInfoReducer;