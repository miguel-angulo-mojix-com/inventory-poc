import {PATH_SUFIXES, SOCKET_IO_CONF} from "../../../scripts/constants";
import io from "socket.io-client";

let socket

class SocketIoService {
  constructor() {
    this.path = '';
    // this.callback;
    // this.errorCallback;
  }

  init(path, callback, errorCallback, detailsCallback) {
    this.path = path;
    this.callback = callback;
    this.errorCallback = errorCallback;
    this.detailsCallback = detailsCallback;

    console.log('init Socket Io')
    socket = io(SOCKET_IO_CONF.host,{
      auth: {
        token: "123"
      },
      extraHeaders: {
        "X-Some-Special-Header": "inventory-poc"
      }
    });

    socket.on('connect', () => {
      console.log(`I'm connected with the back-end`);
    });

    socket.on('connect_failed', () => {
      console.log("Sorry, there seems to be an issue with the connection!");
    })

    socket.on("error", (err) => {
      console.log('ERROR::', err);
      this.errorCallback();
    });
  }

  subscribeSummary() {
    socket.on(`${this.path}${PATH_SUFIXES.SUMMARY}`, data => {
      console.log('llega data', data)
      if (data) {
        this.callback(data)
      }
    });
  }

  subscribeDetails() {
    socket.on(`${this.path}${PATH_SUFIXES.DETAILS}`, data => {
      console.log('llega data', data)
      if (data) {
        this.detailsCallback(data);
      }
    });
  }

  unSubscribe(callback) {
    console.log('Close SocketIO connection')
    socket.disconnect();
    callback()
  }
}

export default SocketIoService;
