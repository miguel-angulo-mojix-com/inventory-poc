// import RestClient from "../../../commons/modules/restClient";

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
    let config = {
      method: "GET",
      url: "/user/validateToken"
    };
    return this.execServices(config)
  }
}



export default new InventoryPocUtils();