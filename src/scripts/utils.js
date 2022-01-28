// import RestClient from "../../../commons/modules/restClient";

import axios from 'axios';
class InventoryPocUtils {
  constructor(props) {
    // super(props);
    // this.options = this.getSessionInfo();
  }
  getSubscriptionDate(){
    const today = new Date();
    return `${today.getFullYear()}${this.leftPad(today.getMonth() + 1, 2)}${this.leftPad(today.getDate(), 2)}`;
  }
  leftPad(num, size){
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }
  getValidateToken(){
    // this.updateInfo();
    const apiUrl = 'https://httpbin.org/ip';
    // const urlRequest = apiUrl;
    const req = {

      url: apiUrl,

    };
    // return this.execServices(config)
    return axios(req);
  }
}



export default new InventoryPocUtils();