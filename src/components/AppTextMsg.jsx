
import { Input } from "antd"
const { TextArea } = Input

function AppTextMsg({textBody, setTextBody}) {

    return (
        <div>
            <TextArea
                style={{ width: '100%', height: '300px', paddingTop: 30 }}
                showCount
                placeholder="response body in text format"
                value={textBody}
                onChange={e => setTextBody(e.target.value)}
            />
        </div>
    )
}


export default AppTextMsg