
import firebase from 'firebase/app'
//import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers } from 'redux'
import {firebaseReducer} from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

const fbConfig = {
    apiKey: "AIzaSyCNHWnsKykpjf_6tSgw_oL5MlxbyfaT4cc",
    authDomain: "react-client-panel-171dd.firebaseapp.com",
    projectId: "react-client-panel-171dd",
    storageBucket: "react-client-panel-171dd.appspot.com",
    messagingSenderId: "584517437037",
    appId: "1:584517437037:web:88c29f7da20c80de03e164",
    measurementId: "G-BLRMCR4437"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
const store = createStore(rootReducer, initialState,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}


export default store;
// // Setup react-redux so that connect HOC can be used
// function App() {
//   return (
//     <Provider store={store}>
//       <ReactReduxFirebaseProvider {...rrfProps}>
//         <Todos />
//       </ReactReduxFirebaseProvider>
//     </Provider>
//   )
// }

// render(<App />, document.getElementById('root'))