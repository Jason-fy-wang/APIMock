import { Tabs } from "antd"
import AppUri from "./Uri"
import AppHeaders from "./Headers"
import AppResponse from "./ResponseMsg"

function AppTabs() {
    const items = [
        {
            key:'1',
            label: 'Request URI',
            children: <AppUri />
        },
        {
            key:'2',
            label: 'Headers',
            children: <AppHeaders />
        },
        {
            key:'3',
            label: 'Body',
            children: <AppResponse />
        }
    ]
  return (
    <Tabs defaultActiveKey="1" centered size="large" items={items}>
    </Tabs>
  )
}

export default AppTabs
