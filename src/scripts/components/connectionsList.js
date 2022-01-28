import React, {useState} from "react";
const ConnectionList = ({connectionType, handleSelectConnection}) => {
  const [connections, setConnections] = useState([
    {
      name: 'CouchDb',
      code: 'couchDb',
      manualRetry:true
    },
    {
      name: 'Firebase',
      code: 'firebase',
      manualRetry:true
    },
    {
      name: 'Socket IO',
      code: 'socketIo',
      manualRetry:false
    },
    {
      name: 'gRPc',
      code: 'grpc',
      manualRetry:false
    },
    {
      name: 'Web Socket',
      code: 'webSocket',
      manualRetry:false
    },
    {
      name: 'SSE',
      code: 'sse',
      manualRetry:false
    },
    {
      name: 'MQTT',
      code: 'mqtt',
      manualRetry:false
    }
  ])
  return (
      <ul className="list-group">
      {
        connections.map((connection, index) =>
          <li key={index}
              className={`${connection.code === connectionType  && 'active'} list-group-item`}
              onClick={()=>handleSelectConnection(connection)}>
            {connection.name}
          </li>
        )
      }
      </ul>
  )
}
export default ConnectionList;

