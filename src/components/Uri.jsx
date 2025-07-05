
import { Input } from "antd"
import { SendOutlined } from '@ant-design/icons'

function AppUri() {

    return (
        <>
            <Input style={{ width: '30%' }}
                placeholder="Enter request URI"
                prefix={<SendOutlined />}
            />
        </>
    )
}

export default AppUri

