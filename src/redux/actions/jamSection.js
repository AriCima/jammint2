export const setJamSection = (jamSection) => {
    console.log('section :', jamSection)
    return  {
        type: "JAM_SECTION", 
        payload: jamSection
    }
};