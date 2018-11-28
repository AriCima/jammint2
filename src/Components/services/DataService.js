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
    static getUserInfo(userId){
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
        console.log('CreateJam launched con la info = ', jamInfo)

        return new Promise((resolve, reject) => {

            firebase.firestore().collection('jams').add(jamInfo)

            .then((result) => {
                
                console.log(`${result.id} Jam succesfully created !`)
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
            console.log('el userID en getJams = ', userId)
            firebase.firestore().collection('jams').where(``,`==`, userId).get()
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
    static addJamtoUser(userID, newJam){
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('users').doc(userID).update({
                jam : newJam})
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
    }

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

    static saveNewMessage (messageId, messageToSave){
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('boardMessages').doc(messageId).set(messageToSave)
            .then((result) => {
                
                console.log("New Board Message succesfully saved !")
                resolve(result);
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('Message NOT added: ', errorCode);
                var errorMessage = error.message;
                
            })
            
        });
    }
    static getBoardMessages(jamId){

        return new Promise((resolve, reject) => {
            let boardMessagesResult = [];

            firebase.firestore().collection('boardMessages').where(`jamId`,`==`, jamId).orderBy("date").get()  // Where me devuelve todos los mensajes que tengan ese jamId
                .then(docs => {

                    docs.forEach((d) => {
                        boardMessagesResult.push(d.data());
                    })
                    resolve(boardMessagesResult);
                })
                .catch(error => reject(error))
        })
    }

    // JAMMERS

    static getJammers(jamId){

        return new Promise((resolve, reject) => {

            firebase.firestore().collection('users').where(`jams.${jamId}`,`==`, true).get() // Where me devuelve todos los users que tengan ese jamId
            .then((result) => {
                let jammers=[];
                result.docs.forEach((d) => {
                    let j = d.data();
                    j.id=d.id;
                    jammers.push(j);
                })
                resolve(jammers);  

            })

            .catch((error) => {
               console.log('error: ', error)
                // reject('Usuario no existe', error)

            })
            
        });
    }


}