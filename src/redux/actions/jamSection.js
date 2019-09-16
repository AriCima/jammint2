export const setJamSection = (section) => {
    return (dispatch) => {
        dispatch({
            type: "JAM_SECTION", 
            payload: section
        })
      
    }
}