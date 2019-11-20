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
                    
                })
                
            });
        };
        static getUserInfo(userId){
            console.log('user info called with: ', userId)
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
        static getUserInfoById(userId){
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
        static getUserJams(userId){
            console.log('user JAMS called with: ', userId)

            return new Promise((resolve, reject) => {

                firebase.firestore().collection('users').doc(userId).collection('userJams').get()
                .then(result => {
                    let jams = [];
                    result.docs.forEach(d => {
                      let j = d.data();
                      j.id = d.id;
                      jams.push(j);
                    });
                    resolve(jams);
                })
            })
            .catch((error) => {
                var errorCode = error.code;
                console.log('Usuario No Existe : ', errorCode);
                
            });
        }

    // JAMS
        // Create
        static createJam(jamInfo) {  
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
        static createJamSections(jamId, section, content ) {
                return new Promise((resolve, reject) => {
                    firebase.firestore().collection('jams').doc(jamId).collection(section).add(content)
                    .then((doc) => {
                        console.log('section ', section, 'creada correctamente', doc.id)
                        resolve({id: doc.id});
                    })

                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log('SECTION could not be created: ', errorCode, errorMessage);

                    })
                    
                });
                
        };
        static startChat(chatId, jamInfo) {  
            console.log('chatId y jamInfo = ', chatId, " / ", jamInfo)
            return new Promise((resolve, reject) => {
                firebase.firestore().collection('jams').doc(chatId).set(jamInfo)
                .then(
                    console.log('chat succesfully added')
                )
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log('Jam could not be created: ', errorCode, errorMessage);
                })
            });
        };

        // GET INFO
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
                    })
                    
                });
        };
        static getJamInfoByCode(jamCode) {  

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
        static getJamInfoById(jamId) {  
                // console.log('jamID en DS =', jamId)
                return new Promise((resolve, reject) => {
                    // console.log('jamInfoBIS  ID de la jam = ', jamId)
                    firebase.firestore().collection('jams').doc(jamId)
                    .get()
                    .then((result) => {
                        // console.log('el result del Bis = ', result);
                        resolve(result.data());
                    })
                    
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log('Error al cargar la JamInfo: ', errorCode, errorMessage);
                    })
                    
                });
        };
        static getJamSectionInfo(jamId, section) {  
            return new Promise((resolve, reject) => {
                // console.log('jamInfoBIS  ID de la jam = ', jamId)
                firebase.firestore().collection('jams').doc(jamId).collection(section).orderBy("createdAt", "asc")
                .get()
                .then(function(querySnapshot) {
                    let result = [];
                    querySnapshot.forEach(function(doc) {
                        // console.log(doc.data())
                        const info = doc.data()
                        result.push(info)
                        // resolve({id: doc.id, data: doc.data()});
                     
                    });
                    console.log(`${section} content = `,result)
                    resolve(result)
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log('Error al cargar la info de ', section, errorMessage);
                })
                
            });
        };
        static getChatContent(jamId) {
            return new Promise((resolve, reject) => {
                firebase.firestore().collection('jams').doc(jamId).collection('messages').orderBy('date', 'desc').limit(50)
                .get()
                .then((result) => {
                    console.log('result = ', result);
                    resolve(result.data());
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log('Error al cargar los mensajes: ', errorCode, errorMessage);
                })
            });
        };


        
        // ADMIN INFO
        static addJamToUser(userID, jamToJoin){
                return new Promise((resolve, reject) => {
                    firebase.firestore().collection(`users`).doc(userID).collection('userJams').doc(jamToJoin.jamId).set(jamToJoin)
                    .then((result) => {
                        console.log("Jam succesfully added to user")
                        resolve(result);
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        console.log('ERROR Jam NOT added to user: ', errorCode);                
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
                        console.log('ERROR Jam NOT added to user: ', errorCode);                
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
        static updateJamInfo(jamId, jamField, newInfo){
            return new Promise((resolve, reject) => {
                // console.log('inputs en el dataservice ', jamCode, jammers);

                firebase.firestore().collection(`jams`).doc(jamId).update({
                    jamField : newInfo})

                .then((result) => {
                    console.log("jamInfo succesfully UPDATED")
                    resolve(result);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    console.log('ERROR jamInfo could NOT be updated: ', errorCode);                
                })
                
            });
        };


    // MESSAGES

    static saveMessage(jamId, section, messageInfo){
        console.log('save message launched with: ', jamId,' / ', section, ' / ',messageInfo)
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('jams').doc(jamId).collection(section).add(messageInfo)
            .then((result) => {
                console.log("message succesfully sent !")
                resolve(result);
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('Message could not be sent: ', errorCode);                
            })
            
        });
    };
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

            firebase.firestore().collection('jams').doc(jamId).collection('jammers').get() 
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
               console.log('error: ', error);
            })
            
        });
    }
    static getJammersMessages(jamId){
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('jams').doc(jamId).collection('jammersMessages').orderBy('createdAt', 'asc')
            .get() 
            .then((result) => {
                let messages=[];
                result.docs.forEach((d) => {
                    let j = d.data();
                    j.id=d.id;
                    messages.push(j);
                })
                resolve(messages);  
            })

            .catch((error) => {
               console.log('error: ', error);
            })
            
        });
    }
    // AÑADIR EL USER A JAMMERS
    static addUserToJammers = (jamId, userInfo) => {
        console.log('userInfo = ', userInfo)
        const userId = userInfo.userId;
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('jams').doc(jamId).collection('jammers').doc(userId).set(userInfo)
            .then((res) => {
                console.log('user is now a jammer', res);
            }).catch((err) => {
                console.log('user not added to jammers: ', err);
            })
        });
    }
    
}

