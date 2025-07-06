import { InputNumber  } from "antd"

function AppStatus({statusCode, setStatusCode}) {

    return  (
        <div>
            <InputNumber
                style={{ width: '30%' }}
                placeholder="Enter response status code"
                value={statusCode}
                onChange={(value) => setStatusCode(value)}
            />
        </div>
    )
}

export default AppStatus
