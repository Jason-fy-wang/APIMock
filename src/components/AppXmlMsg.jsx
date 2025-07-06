import { Input } from "antd"
const { TextArea } = Input

function AppXmlMsg({xmlBody, setXmlBody}) {

    return (
        <div>
            <TextArea
                style={{ width: '100%', height: '300px', paddingTop: 30 }}
                showCount
                placeholder="response body in XML format"
                value={xmlBody}
                onChange={e => setXmlBody(e.target.value)}
            />
        </div>
    )
}


export default AppXmlMsg