export const setJamSection = (jamSection) => {
    // console.log('setJamSection launched: ');

    return  {
        type: "JAM_SECTION", 
        payload: jamSection
    }
};