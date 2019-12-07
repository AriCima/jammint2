import React from 'react';

import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChalkboard, faComments, faUsers, faUserLock, faCog} from '@fortawesome/free-solid-svg-icons'

export default class Calculations {

    static getCurrentMonth(){
        let months  =  ['Januay', 'February', 'March', 'April','May', 'June', 'July', 'August','September', 'October', 'November', 'December'];
        const date = new Date();
        let monthNr = date.getMonth()
        let currentMonth = months[monthNr]
       
        return currentMonth
    };

    static getMessageDate(timestamp){
        const currentDate = moment(new Date()).format('DD/MM/YYYY');
        const messageDate =  moment(timestamp.toDate()).format('DD/MM/YYYY');
        let messageTime = '';
        
        if( messageDate === currentDate ){
            messageTime = 'today at ' + moment(timestamp.toDate()).format('h:mm');
        } else {
            messageTime = moment(timestamp.toDate()).format('DD/MM');
        }
        return messageTime
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
        let random = Math.round(Math.random()*25);

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
    static getJamSections(type){
        //console.log('get Jam Sections launched')
        let sections = [];
        switch (type) {
            case 'accommodation':
              sections = ['board', 'jammers', 'myJam', 'settings']
              break;
            case 'standard':
                sections = ['board', 'jammers']
                break;
            case 'chat': 
                sections = ['chat']
                break;
            default:
              //console.log('no reconoce tipo')
        }
       return sections;
    };

    // - - - - - SORTING FUNCTIONS 

    // https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
    static sortByDateAsc(x){
        //console.log('info received :', x);
        function compare(a,b){
            const varA = new Date(a.createdAt.seconds);
            const varB = new Date(b.createdAt.seconds);
        
            let comparison = 0;
            if (varA < varB) {
            comparison = -1;
            } else if (varA > varB) {
            comparison = 1;
            }
            return comparison;
        }

        return x.sort(compare)
    };
    static sortByDateDesc(x){

        function compare(a,b){
            const varA = new Date(a.createdAt.seconds);
            const varB = new Date(b.createdAt.seconds);
        
            let comparison = 0;
            if (varA > varB) {
            comparison = -1;
            } else if (varA < varB) {
            comparison = 1;
            }
            return comparison;
        }

        return x.sort(compare)
    };
    static sortAsc(x){
        //console.log('info received :', x);
        function compare(a,b){
            const varA = a[0];
            const varB = a[1];
        
            let comparison = 0;
            if (varA < varB) {
            comparison = -1;
            } else if (varA > varB) {
            comparison = 1;
            }
            return comparison;
        }

        return x.sort(compare)
    };


    // HEADER ICONS

    static getHeaderIcon = (section) => {
        let icon = ''
        switch (section){
            case 'board':
                icon = <p><FontAwesomeIcon className="navBar-icon-style" icon={faChalkboard} /></p>  
                break;
            case 'jammers':
                icon = <p><FontAwesomeIcon className="navBar-icon-style" icon={faUsers} /></p>  
                    break;
            case 'settings':
                icon = <p><FontAwesomeIcon className="navBar-icon-style" icon={faCog} /></p>  
                    break;
            case 'myJam':
                icon = <p><FontAwesomeIcon className="navBar-icon-style" icon={faUserLock} /></p>  
                    break;
            case 'chat':
                icon = <p><FontAwesomeIcon className="navBar-icon-style" icon={faComments} /></p>  
                break;
            default:
                //console.log('no navbar item matched')
        };

        return icon
    };

    // - - - - - - - CONTRATO
    static getApartmentDivisions = (totalRooms) => {
        let divisions = {eng: '', esp:''}
        switch (totalRooms){
            case '2':
                divisions = {eng: 'one half part (1/2)', esp: 'una media parte (1/2'};
                break;
            case '3':
                    divisions = {eng: 'one third part (1/3)', esp: 'una tercera parte (1/3'};
                    break;
            case '4':
                    divisions = {eng: 'one fourth part (1/4)', esp: 'una cuarta parte (1/4'};
                    break;
            case '5':
                    divisions = {eng: 'one fifth part (1/5)', esp: 'una quinta parte (1/5'};
                    break;
            case '6':
                    divisions = {eng: 'one sixth part (1/6)', esp: 'una sexta parte (1/6'};
                    break;
            case '7':
                    divisions = {eng: 'one seventh part (1/7)', esp: 'una séptima parte (1/7'};
                    break;
            case '8':
                    divisions = {eng: 'one eigth part (1/8)', esp: 'una octava parte (1/8)'};
                    break;
            case '9':
                    divisions = {eng: 'one nineth part (1/9)', esp: 'una novena parte (1/9)'};
                    break;
            case '10':
                    divisions = {eng: 'one tenth part (1/10)', esp: 'una decima parte (1/10)'};
                    break;
            default:
                //console.log('el apartamento tiene más de 10 habitaciones')
        };

        return divisions
    };
    
    static getgetMyJammers = (totalRooms) => {
        let divisions = {eng: '', esp:''}

    };

    // - - - - - - - - BOOKINGS

    static organizeBookings = (bookings) => {
        const result = {
            currentBooking: {}, 
            dueBookings: [],
            futureBookings: [],
            nextBooking: {}
        }
        const currentDate = new Date()
        bookings.forEach(e =>{

            if ( currentDate > e.checkOut ) {
                result.dueBookings.push(e)
            } else if ( currentDate < e.checkIn) {
                result.futureBookings.push(e);
            } else if ( (e.checkIn >= currentDate) && (currentDate <= e.checkOut) ) {
                result.currentBooking = e
            }
        })
        result.nextBooking = result.futureBookings[0];
        return result
    }

}