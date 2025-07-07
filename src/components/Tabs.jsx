import { Tabs, Button } from "antd"
import AppUri from "./AppUri"
import AppHeaders from "./AppHeaders"
import AppResponse from "./AppResponseMsg"
import AppStatus from "./AppStatus"
import { useState } from "react"
import { Divider } from "antd"
import {mockNewApi, showMessage} from "../api/ApiClient"

function AppTabs() {
    const [uri, setUri] = useState("")
    const [dataColumns, setDataColumns] = useState([{id: Date.now(), key: '', value: ''}])
    const [body, setBody] = useState("")
    const [activeKey, setActiveKey] = useState("1");
    const [statusCode, setStatusCode] = useState(200);
    const [method, setMethod] = useState("GET");

    function NewMock() {
        const headers = dataColumns.reduce((acc, col) => {
            acc[col.key] = col.value;
            return acc;
        }, {});
        //console.log("New Mock Request method: ", method, " url: ", uri, " headers: ", headers, "columns: ", dataColumns, " body: ", body, " status code: ", statusCode);
        const date = {
            url: uri,
            method: method,
            response: {
                status: statusCode,
                headers: headers,
                body: body
            }
        }
        console.log("New Mock Request: ", date);
        mockNewApi(date);
    }

    const items = [
        {
            key:'1',
            label: 'Request URI',
            children: <AppUri uri={uri} setUri={setUri} method={method} setMethod={setMethod} />
        },
        {
            key:'2',
            label: 'Headers',
            children: <AppHeaders dataColumns={dataColumns} setDataColumns={setDataColumns} />
        },
        {
            key:'3',
            label: 'Body',
            children: <AppResponse body={body} setBody={setBody} activeKey={activeKey} setActiveKey={setActiveKey}/>
        },
        {
            key:'4',
            label: 'Status',
            children: <AppStatus statusCode={statusCode} setStatusCode={setStatusCode} />
        }
    ]
  return (
    <div>
        <Button type="primary" style={{marginTop: '10px'}} onClick={NewMock}>New</Button>
        <Divider />
        <Tabs defaultActiveKey="1" centered size="large" items={items} />
    </div>
    
  )
}

export default AppTabs
