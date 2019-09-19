export const setJamSection = (jamSection) => {
    console.log('section received = ', jamSection)
    return  {
        type: "JAM_SECTION", 
        payload: jamSection
    }
}