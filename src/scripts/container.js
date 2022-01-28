// import '../stylesheets/index.scss';
import React, {useEffect, useRef, useState} from 'react';
import ConnectionList from "./components/connectionsList";
import HeaderSection from "./components/header.section";
import RealtimeSection from "./components/realtime.section";
import CalculatedSection from "./components/calculated.section";
import {DEFAULT_SUMMARY} from "./constants";
// import {useLocation} from "react-router-dom"
import FirebaseService from "../services/realTime/firebase/service";
import CouchService from "../services/realTime/couchDb/service";
import WebSocketService from "../services/realTime/web-socket/service";
import SocketIoService from "../services/realTime/socket-io/service";
import InventoryPocUtils from "../scripts/utils";
import SeeService from "../services/realTime/sse/service";

function Container(props) {
  const services = {
    firebase: new FirebaseService(),
    couchDb: new CouchService(),
    webSocket: new WebSocketService(),
    socketIo: new SocketIoService(),
    sse: new SeeService(),
  }
  // let params = useLocation().search;
  // const connTypeParam = new URLSearchParams(params).get('connectionType');
  const [filterPath, setFilterPath] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [connectionType, setConnectionType] = useState('');
  const [summary, setSummary] = useState(DEFAULT_SUMMARY);
  const [details, setDetails] = useState(DEFAULT_SUMMARY);
  const [sessionTimer, setSessionTimer] = useState(null);
  const [online, setOnline] = useState(false);
  const [manualRetry, setManualRetry] = useState(false);

  useEffect(() => {
    // InventoryPocUtils.getValidateToken().then(() => {
    //   setOnline(true)
    // }).catch(error => {
    //   setOnline(false)
    // })
    setOnline(true)
    //Use query params to test connections
    // if (connTypeParam) {
      setTimeout(() => {
        handleSelectConnection({code: 'socketIo', manualRetry: false});
        handleSubscribe()
      }, 500)
    // }
  }, []);


  useEffect(() => {
    if (online && isSubscribed) {
      setTimeout(() => {
        subscribeSummary();
      }, 500);
    }
  }, [online, isSubscribed]);

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed)
    if (isSubscribed) {
      unsubscribeConn();
      setSummary(DEFAULT_SUMMARY);
      if (manualRetry) {
        clearTimeout(sessionTimer);
        setSessionTimer(null)
      }
    }
  }

  const handleFilters = (newFilter) => {
    setFilterPath(newFilter)
  }

  const handleSelectConnection = (connection) => {
    if (isSubscribed) {
      handleSubscribe();
    }
    setConnectionType(connection.code)
    setManualRetry(connection.manualRetry)
  }

  const summaryCallback = (response) => {
    if (response) {
      console.log(`[RealTime] [${connectionType}]`, JSON.stringify({...response, localTimestamp: Date.now()}));
      // response['nowTs'] = Date.now();
      // setSummary(response)
    }
  }

  const detailsCallback = (response) => {
    console.log(`[NotRealTime] [${connectionType}]`, JSON.stringify({...response, localTimestamp: Date.now()}));
  }

  const summaryError = (data) => {
    console.log('Error', data)
    unsubscribeConn();
  }

  const subscribeSummary = () => {
    console.log('entra')
    if (manualRetry && !sessionTimer) {
      verifySession();
    }

    if (connectionType === 'firebase') {
      services[connectionType].init(filterPath, summaryCallback, summaryError, detailsCallback).then(() => {
        services[connectionType].subscribeSummary();
        if (services[connectionType].subscribeDetails) {
          services[connectionType].subscribeDetails();
        }
      });
    } else {
      // console.log('filterPath', filterPath);
      services[connectionType].init(filterPath, summaryCallback, summaryError, detailsCallback);
      // services[connectionType].init('IKEA-1234567-20220124', summaryCallback, summaryError, detailsCallback);
      services[connectionType].subscribeSummary();
      if (services[connectionType].subscribeDetails) {
        services[connectionType].subscribeDetails();
      }
    }
  }

  const unsubscribeConn = () => {
    services[connectionType].unSubscribe(() => {
    })
  }

  const verifySession = () => {
    setSessionTimer(setTimeout(validateToken, 5000));
  }

  const validateToken = () => {
    clearTimeout(sessionTimer);
    InventoryPocUtils.getValidateToken().then(() => {
      // console.log('Verify Connection true')
      setOnline(true)
      verifySession();
    }).catch(error => {
      console.log('Verify Connection')
      setOnline(false)
      verifySession();
    })
  }

  return (
    <div className="inventory-realtime-poc">
      <h2>Real Time POC</h2>
      {/*<div className="connection-list-cont">*/}
      {/*  <ConnectionList connectionType={connectionType}*/}
      {/*                  handleSelectConnection={handleSelectConnection}/>*/}
      {/*</div>*/}
      {/*<div className="connection-detail-cont">*/}
      {/*  <HeaderSection isSubscribed={isSubscribed}*/}
      {/*                 handleSubscribe={handleSubscribe}*/}

      {/*                 handleFilters={handleFilters}/>*/}
      {/*  <div className='details-cont'>*/}
      {/*    /!*<RealtimeSection/>*!/*/}
      {/*    <CalculatedSection {...summary}/>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  )
}

export default Container;