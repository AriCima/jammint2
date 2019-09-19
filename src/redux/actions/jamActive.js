
export const selectJam = (jamId) => {
    return {
        type: 'JAM_ACTIVE', 
        payload: jamId
    }
};