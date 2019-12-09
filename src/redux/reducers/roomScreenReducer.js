const roomActionsReducer = (state = 'overview', action) => {  
    switch(action.type) {
        case 'ACTIVE_SCREEN':
            return action.payload;
        default:
            return state
    }
};

export default roomActionsReducer;