import PouchDB from 'pouchdb';
import {COUCHDB_DB_CONF, PATH_SUFIXES} from "../../../scripts/constants";

let dbChanges=null
let dbDetailsChanges = null;

class CouchService {
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
    console.log('Init Couch-db')
  }
  subscribeSummary() {
    const options = {
      live: true,
      retry: true,
      continuous: true,
      auth: COUCHDB_DB_CONF.auth,
      // fetch: (url, opts) => {
      //   opts.headers.set('X-Some-Special-Header', 'inventory-poc');
      //   return PouchDB.fetch(url, opts);
      // }
    };
    const urlDb = `${COUCHDB_DB_CONF.host}/inventory`
    const db = new PouchDB(urlDb, options)

    db.get(`${this.path}${PATH_SUFIXES.SUMMARY}`).then(data => {
      this.callback(data.data)
      addLiveUpdateListener()
    })
    const addLiveUpdateListener = () => {
      dbChanges = db.changes({
        live: true,
        include_docs: true,
        retry: true,
        since: 'now',
        doc_ids: [`${this.path}${PATH_SUFIXES.SUMMARY}`]
      })
        .on('change', (change) => {
          this.callback(change.doc.data)
        })
        .on(
          'error',this.errorCallback
        );
    };
  }

  subscribeDetails() {
    const options = {
      live: true,
      retry: true,
      continuous: true,
      auth: COUCHDB_DB_CONF.auth,
      // fetch: (url, opts) => {
      //   opts.headers.set('X-Some-Special-Header', 'inventory-poc');
      //   return PouchDB.fetch(url, opts);
      // }
    };
    const urlDb = `${COUCHDB_DB_CONF.host}/inventory`
    const db = new PouchDB(urlDb, options)

    db.get(`${this.path}${PATH_SUFIXES.DETAILS}`).then(data => {
      this.detailsCallback(data.data);
      addLiveUpdateListener();
    })
    const addLiveUpdateListener = () => {
      dbDetailsChanges = db.changes({
        live: true,
        include_docs: true,
        retry: true,
        since: 'now',
        doc_ids: [`${this.path}${PATH_SUFIXES.DETAILS}`]
      })
        .on('change', (change) => {
          this.detailsCallback(change.doc.data);
        })
        .on(
          'error',this.errorCallback
        );
    };
  }

  unSubscribe(callback) {
    dbChanges.cancel();
    dbDetailsChanges.cancel();

    callback();
    // window.removeEventListener('offline');
    console.log('Close Couch connection')
  }
}

export default CouchService;