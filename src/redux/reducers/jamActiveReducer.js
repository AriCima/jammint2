const jamsReducer = (state = [], action) => {
    switch(action.type) {

        case 'JAM_ACTIVE':
            return action.payload;
        default:
            return state
    }
};

export default jamsReducer;