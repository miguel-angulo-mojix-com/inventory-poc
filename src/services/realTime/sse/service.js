import {PATH_SUFIXES, SSE_CONF} from "../../../scripts/constants";
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

let sse

class SeeService {
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

    console.log('Init SSE')

    sse = new EventSourcePolyfill(SSE_CONF.host + `/${this.path}`, {
      withCredentials: true,
      headers: {
        "X-Some-Special-Header": "inventory-poc"
      }
    });
    sse.onerror = (error) => {
      // error log here
      this.errorCallback()
      console.log('SSE Error', error)
      // sse.close();
    }
  }

  subscribeSummary() {
    sse.addEventListener(`${this.path}${PATH_SUFIXES.SUMMARY}`, (event) => {
      this.callback(JSON.parse(event.data))
    });
  }

  subscribeDetails() {
    sse.addEventListener(`${this.path}${PATH_SUFIXES.DETAILS}`, (event) => {
      this.detailsCallback(JSON.parse(event.data))
    });
  }

  unSubscribe(callback) {
    console.log('Disconnect SSE')
    sse.close();
    callback()
  }
}

export default SeeService;
