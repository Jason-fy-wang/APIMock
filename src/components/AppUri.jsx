
import { Input,Select,Space } from "antd"
import { SendOutlined } from '@ant-design/icons'

function AppUri({uri, setUri, method, setMethod}) {

    const options = [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
        { value: 'DELETE', label: 'DELETE' }
    ]

    return (
        <>
            <Select style={{ width: '6%' }} options={options} value={method} onChange={setMethod} defaultActiveFirstOption/>
            <Input style={{ width: '30%' }}
                placeholder="Enter request URI"
                prefix={<SendOutlined />}
                value={uri}
                onChange={(e) => setUri(e.target.value)}
            />
        </>
    )
}

export default AppUri

