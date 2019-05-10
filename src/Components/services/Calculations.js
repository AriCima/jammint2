

export default class Calculations {

    static getCurrentMonth(){
        let months  =  ['Januay', 'February', 'March', 'April','May', 'June', 'July', 'August','September', 'October', 'November', 'December'];
        const date = new Date();
        let monthNr = date.getMonth()
        let currentMonth = months[monthNr]
       
        return currentMonth
    }

    static generateCode(){
     // GENERATE BOOKING CODE
     const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
     let codeArray = [];
     let codeArrayEnd = [];

     for (let l=0; l<4; l++){
        let capital = Math.round(Math.random()*10);
        let random = Math.round(Math.random()*25);

        if(Number.isInteger(capital/2)){
            codeArray[l]=(letters[random]).toUpperCase();
        } else {
            codeArray[l]=letters[random];
        }
     };
     for (let l=0; l<4; l++){
        let capital = Math.round(Math.random()*10);
        let random = Math.round(Math.random()*26);

        if(Number.isInteger(capital/2)){
            codeArrayEnd[l]=(letters[random]).toUpperCase();
        } else {
            codeArrayEnd[l]=letters[random];
        }
     };

     let d = new Date();
     let t = d.getTime().toString();  

     let code = codeArray.join("").concat(t).concat(codeArrayEnd.join(""));


     return code
     
    };
}