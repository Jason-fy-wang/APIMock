import { message } from "antd";


function showMessage(type, content) {
    if (type === 'success') {
        message.success(content);
    } else if (type === 'error') {
        message.error(content);
    } else if (type === 'info') {
        message.info(content);
    } else if (type === 'warning') {
        message.warning(content);
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
