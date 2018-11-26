import firebase from 'firebase';

export default class DataService {

    // USERS 
    static saveUserInfoInFirestore(userId, userToSave){
        //registro en Firebase
        // console.log("el user recibido en el registro firestore es:", userId)
        // console.log("el userToSave recibido en firestore es: ", userToSave)
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('users').doc(userId).set(userToSave)
            .then((result) => {
                
                console.log("User information succesfully saved !")
                resolve(result);
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('User NOT added: ', errorCode);
                var errorMessage = error.message;
                
            })
            
        });
    };
    static getUserContactInfo(userId){
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('users').doc(userId).get()

            .then((result) => {
                resolve(result.data());   // OBTENGO TODO LO QUE TENGO ALMACENADO DE ÉSTE USUARIO
            })
            .catch((error) => {
                reject('Usuario no existe');
            })
            
        });
    };

    // JAMS
    static createJam(jamInfo) {  
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('jams').add(jamInfo)

            .then((result) => {
                
                console.log("Jam succesfully created !")
                resolve(result);
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('Jam could not be created: ', errorCode);
                var errorMessage = error.message;
                
            })
            
        });
    };
    static getUserJams(userId){
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('jams').where(`userId`,`==`, userId).get()
            .then((result) => {
            
                let jms=[];
                result.docs.forEach((d) => {
                    let j = d.data();
                    j.id=d.id;
                    jms.push(j);
                })
                resolve(jms);  
            })

            .catch((error) => {
               console.log('error: ', error)
                // reject('Usuario no existe', error)

            })
            
        });
    };


    // MESSAGES
    static sendMessage(messageInfo) {  
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('messages').add(messageInfo)
            .then((result) => {
                console.log("message succesfully sent !")
                resolve(result);
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('Message could not be sent: ', errorCode);
                var errorMessage = error.message;
                
            })
            
        });
    };
    static getUserMessages(userId){
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('messages').where(`sender`,`==`, userId && 'receiver', '==', userId).get()
            .then((result) => {
                let chts=[];
                result.docs.forEach((d) => {
                    let j = d.data();
                    j.id=d.id;
                    chts.push(j);
                })
                resolve(chts);  
            })
            .catch((error) => {
               console.log('error: ', error);
                // reject('Usuario no existe', error)
            })
            
        });
    };

}