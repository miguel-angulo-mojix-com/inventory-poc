const FIREBASE_DB_CONF = {
  apiKey: "AIzaSyC-HrkLc2C6GC9ynkmrJW9aN-LU68QM3ao",
  authDomain: "saas-mobile-io.firebaseapp.com",
  databaseURL: "https://saas-mobile-io-default-rtdb.firebaseio.com",
  projectId: "saas-mobile-io",
  storageBucket: "saas-mobile-io.appspot.com",
  messagingSenderId: "1081906831423",
  appId: "1:1081906831423:web:0d5babe3963817d5f7d88a",
  measurementId: "G-MB0PPEN0JW"
}

const FIREBASE_DB_AUTH = {
  email: "poc@mojix.com",
  password: "control123!"
}

const COUCHDB_DB_CONF = {
  // host:'http://104.154.200.199:5984',
  host: 'https://couchdb-dev-02.vizix.cloud/',
  auth: {
    password: "control123!",
    username: "admin"
  }
}

const WEB_SOCKET_CONF = {
  host: 'http://104.154.200.199:3000'
}

const SOCKET_IO_CONF = {
  // host: 'http://104.154.200.199:3000'
  host: 'https://socketio-dev-02.vizix.cloud'
}

const SSE_CONF = {
  // host: 'https://couchdb-connector-wzi2ss44oq-uc.a.run.app/sse'
  host: 'https://sse-dev-02.vizix.cloud/sse'
}

const DEFAULT_SUMMARY = {
  expected: 0,
  missing: 0,
  total: 0,
  found: 0,
  overs: 0,
  extras: 0,
  progress: 0
}

const DEFAULT_DETAILS = {
  "key": "00942998192216",
  "products": {
    "size": "12",
    "color": "Black",
    "model": "Verano",
    "department": "Shoes"
  },
  "expected": 1,
  "missing": 1,
  "found": 0,
  "overs": 0,
  "extras": 0,
  "progress": 0,
  "total": 0,
  "tags": [
    "30340000000000000000001",
    "30340000000000000000002",
    "30340000000000000000003"
  ]
}

const PATH_SUFIXES = {
  SUMMARY: '-summary',
  DETAILS: '-details'
};


export {
  FIREBASE_DB_CONF,
  DEFAULT_SUMMARY,
  COUCHDB_DB_CONF,
  WEB_SOCKET_CONF,
  SOCKET_IO_CONF,
  SSE_CONF,
  PATH_SUFIXES,
  FIREBASE_DB_AUTH
};