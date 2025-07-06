import { message } from "antd";

const [messageApi, contextHolder] = message.useMessage();

function showMessage(type, content) {
    if (type === 'success') {
        messageApi.success(content);
    } else if (type === 'error') {
        messageApi.error(content);
    } else if (type === 'info') {
        messageApi.info(content);
    } else if (type === 'warning') {
        messageApi.warning(content);
    } else {
        console.warn('Unknown message type:', type);
    }
}

function mockNewApi(data){
    fetch('/api/v1/config', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        showMessage('success', 'New mock API created successfully');
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        showMessage('error', 'Failed to create mock API: ' + error.message);
        console.error('Error:', error);
    });
}


export {
    mockNewApi
};
