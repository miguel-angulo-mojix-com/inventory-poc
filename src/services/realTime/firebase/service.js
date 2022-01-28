import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import {FIREBASE_DB_CONF, FIREBASE_DB_AUTH} from "../../../scripts/constants";
import {PATH_SUFIXES} from "../../../scripts/constants";

let ref = null;
let db = null;
class FirebaseService {
  constructor() {
    this.path='';
    // this.callback;
    // this.errorCallback;
    // this.detailsCallback;
  }
  init(path, callback, errorCallback, detailsCallback){
    this.path = path;
    this.callback = callback;
    this.errorCallback = errorCallback;
    this.detailsCallback = detailsCallback;

    console.log('Init Firebase')
    if(!db){
      firebase.initializeApp(FIREBASE_DB_CONF);
      db = firebase.database()
    }
    return firebase.auth().signInWithEmailAndPassword(FIREBASE_DB_AUTH.email, FIREBASE_DB_AUTH.password)
  }

  subscribeSummary() {
    try {
      ref=  db.ref(`${this.path}${PATH_SUFIXES.SUMMARY}`).on("value", snapshot => {
        this.callback(snapshot.val())
      });
    } catch (error) {
      console.log('--->error', error)
      this.errorCallback()
    }
  }

  subscribeDetails(){
    try {
      let refDetails =  db.ref(`${this.path}${PATH_SUFIXES.DETAILS}`).on("value", snapshot => {
        this.detailsCallback(snapshot.val())
      });
    } catch (error) {
      console.log('---> error', error)
      // this.errorCallback()
    }
  }

  unSubscribe(callback) {
    db.goOffline()
    callback();
    console.log('Close Firebase connection')
  }
}

export default FirebaseService;