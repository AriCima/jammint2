import React from 'react';
import ReactDOM from 'react-dom';

//CSS
import './index.css';

// COMPONENTS
import App from '../src/Components/App';
// import registerServiceWorker from './registerServiceWorker';

// REDUX  el Middleware me permite utilizar el Thuk
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './redux/reducers/rootReducer'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// connecting Redux to Firebase: https://www.youtube.com/watch?v=gf5bVfVlNUM
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/fbConfig'

//compose me permite agregar varios "potenciadores" al store. 
// en este caso agrego, thunk y los dos fun que me potencial la intereacción react-redux-firebase
const store = createStore(rootReducer, 
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(fbConfig),
        reactReduxFirebase(fbConfig, {useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true})
    )
);


ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>
    , document.getElementById('root'));
// registerServiceWorker();
