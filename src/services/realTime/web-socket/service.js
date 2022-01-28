import {WEB_SOCKET_CONF} from "../../../scripts/constants";

let ws = null

class WebSocketService {
  init(){
    ws = new WebSocket(WEB_SOCKET_CONF.host);
    ws.onopen = () => {
      console.log('WebSocket Client Connected');
    };
  }
  subscribeSummary(path, callback, errorCallback) {
    console.log('subscribeSummary')
    ws.onmessage = (message) => {
      console.log(message);
    };
  }

  unSubscribe(callback) {
    ws.close();
    callback();
    console.log('Close Web Sockets connection')
  }
}

export default WebSocketService;