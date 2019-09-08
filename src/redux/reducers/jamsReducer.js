const initState = {
    jamsList: [
        {
        jamId: 1234,
        jamName: 'Cooles Jam on Earth',
        createdAt: new Date(),
        },
        {
            jamId: 5678,
            jamName: 'Second Jam',
            createdAt: new Date(),
        }
    ]
};

const jamReducer = (state = initState, action) => {
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
        default:
            return state
    }
};

export default jamReducer;