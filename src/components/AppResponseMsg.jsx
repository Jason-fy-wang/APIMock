import { Tabs } from "antd"
import AppTextMsg from "./AppTextMsg"
import AppJsonMsg from "./AppJsonMsg"
import AppXmlMsg from "./AppXmlMsg"
import {useState} from "react"

function AppResponse({body, setBody,activeKey, setActiveKey}) {
    // json xml text form form-encoded GraphQL Bninary

    const [jsonBody, setJsonBody] = useState("")
    const [xmlBody, setXmlBody] = useState("")
    const [textBody, setTextBody] = useState("")
    
    function updateBody(key) {
        switch (key) {
            case '1':
                setBody(jsonBody)
                break;
            case '2':
                setBody(xmlBody)
                break;
            case '3':
                setBody(textBody)
                break;
            default:
                setBody("")
        }
    }
    function handleJsonChange(val) {
        setJsonBody(val);
        setBody(JSON.stringify(JSON.parse(val)).replace(/[\r\n]+/g, "").replace(/\s+/g, "").trim()); // Format JSON
    }
    function handleXmlChange(val) {
        setXmlBody(val);
        setBody(val);
    }
    function handleTextChange(val) {
        setTextBody(val);
        setBody(val);
    }
    const items = [
        {
            key: '1',
            label: 'JSON',
            children: <AppJsonMsg value={jsonBody} setJasonValue={handleJsonChange} />
        },
        {
            key: '2',
            label: 'XML',
            children: <AppXmlMsg value={xmlBody} setXmlBody={handleXmlChange} />
        },
        {            
            key: '3',
            label: 'Text',
            children: <AppTextMsg value={textBody} setTextBody={handleTextChange} />

        }
    ]

    return (
        <div style={{width: '50%', alignContent: 'center', margin: 'auto'}}>
        <Tabs defaultActiveKey="1" centered size="medium" items={items} activeKey={activeKey} onChange={key => {setActiveKey(key);
        updateBody(key);
        }}/>

        </div>
    )
}

export default AppResponse
