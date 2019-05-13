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

    static getUserInfoBis(userId){
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('users').doc(userId).onSnapshot(function(doc) {
                let userInfo = doc.data();
                console.log("Current data: ", doc.data());
                resolve (userInfo)
            });   
        })
        .catch((error) => {
            var errorCode = error.code;
            console.log('Usuario No Existe : ', errorCode);
            
        });
    };





    // JAMS

    static createJam(jamInfo) {  

        console.log('creteJam launched en Dataservice')
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
    static createJamBeta(jamInfo) {  

        console.log('creteJam launched en Dataservice')
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('jams').add(jamInfo)

            .then((doc) => {
               
                resolve({id: doc.id});
                
            })

            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('Jam could not be created: ', errorCode, errorMessage);

            })
            
        });
    };
    static getJamToJoin(jamCode) {  
        console.log('JamCode recibido en el join del Data =', jamCode);
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('jams').where('jamCode', '==', jamCode).get()

            // .then((result) => {
            //     console.log('el result del join = ', result);
            //     resolve(result.data());
            // })
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots

                    let reply = doc.data();
                    reply.jamId = doc.id;

                    resolve(reply)
                });
                
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('Jam NOT joined: ', errorCode);
                var errorMessage = error.message;
                
            })
            
        });
    };
    static getJamInfo(jamCode) {  

        return new Promise((resolve, reject) => {
            console.log('el ID con el que se pide la info de la jam = ', jamCode)
            firebase.firestore().collection('jams').where('jamCode', '==', jamCode)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    resolve({id: doc.id, data: doc.data()});
                });
            })

            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('Error al cargar la JamInfo: ', errorCode, errorMessage);
            })
            
        });
    };
    static updateJamsArrayInUser(userID, jamsList){
        return new Promise((resolve, reject) => {
            console.log('inputs en el dataservice ', userID, jamsList);

            firebase.firestore().collection(`users`).doc(userID).update({
                userJams : jamsList})

            .then((result) => {
                console.log("Jam succesfully UPDATED")
                resolve(result);
            })
            .catch((error) => {
                var errorCode = error.code;
                console.log('ERROR Jam NOT added to user: ', error);                
            })
            
        });
    };

    static updateJammersInJam(jamId, jammers){
        return new Promise((resolve, reject) => {
            // console.log('inputs en el dataservice ', jamCode, jammers);

            firebase.firestore().collection(`jams`).doc(jamId).update({
                jammers : jammers})

            .then((result) => {
                console.log("Jammers succesfully UPDATED")
                resolve(result);
            })
            .catch((error) => {
                var errorCode = error.code;
                console.log('ERROR Jam NOT added to user: ', errorCode);                
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
    };
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
    };

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