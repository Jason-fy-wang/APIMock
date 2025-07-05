import { Tabs } from "antd"

import AppTextMsg from "./TextMsg"
import AppJsonMsg from "./JsonMsg"
import AppXmlMsg from "./XmlMsg"

function AppResponse(){
    // json xml text form form-encoded GraphQL Bninary
    const items = [
        {
            key: '1',
            label: 'JSON',
            children: <AppJsonMsg />
        },
        {
            key: '2',
            label: 'XML',
            children: <AppXmlMsg />
        },
        {            
            key: '3',
            label: 'Text',
            children: <AppTextMsg />

        }
    ]

    return (
        <div style={{width: '50%', alignContent: 'center', margin: 'auto'}}>
        <Tabs defaultActiveKey="1" centered size="medium" items={items} />

        </div>
    )
}

export default AppResponse
