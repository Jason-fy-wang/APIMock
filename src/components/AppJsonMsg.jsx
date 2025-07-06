
import { Divider } from "antd";
import { Input, Button, message } from "antd";
import { useState } from "react";

const { TextArea } = Input;

function AppJsonMsg({value, setJasonValue}) {
    //const [value, setValue] = useState("");

    const handleFormat = () => {
        try {
            const json = JSON.parse(value);
            if (typeof json !== 'object' || json === null) {
                throw new Error('Only JSON object or array is allowed');
            }
            setJasonValue(JSON.stringify(json, null, 2));
        } catch (e) {
            message.error("Invalid JSON");
        }
    };

    return (
        <div >
            <Button
                type="text"
                size="small"
                style={{ position: 'absolute', right: 0, top: 0}}
                onClick={handleFormat}
            >
                Format
            </Button>
            <Divider />
            <TextArea
                style={{ width: '100%', height: '300px', paddingTop: 30 }}
                showCount
                placeholder="response body in JSON format"
                value={value}
                onChange={e => setJasonValue(e.target.value)}
            />
        </div>
    );
}

export default AppJsonMsg