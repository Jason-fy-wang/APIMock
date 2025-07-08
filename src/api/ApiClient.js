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

// convert async to sync
async function mockNewApi(data){
    try{
        const response = await fetch('/api/v1/config', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (!response.ok){
            showMessage('error','Network response was not ok');
            return false;
        }
        
        const result = await response.json();
        showMessage('success', result.message || "success");
        return true;
    }catch(error){
        console.error('Error:', error);
        showMessage('error', error.message  || "add mock fail");
        return false
    }
}

async function getHttpKeys(){
    return fetch('/api/v1/keys', {
        method: "GET"
    })
    .then(response => {
        if (!response.ok) {
            showMessage('error','Network response was not ok');
        }
        //showMessage('success', 'getHttpKeys successfully');
        return response.json();
    })
    .then(data => {
        return data
    })
    .catch(err =>{
        console.log('error', 'Failed to getHttpKeys: ' + err.message);
        return err
    })
}

async function getHttpValues(){
    return fetch('/api/v1/values', {
        method: "GET"
    })
    .then(response => {
        if (!response.ok) {
            showMessage('error','Network response was not ok');
        }
        //howMessage('success', 'getHttpValues successfully');
        return response.json();
    })
    .then(data => {
        return data
    })
    .catch(err =>{
        console.log('error', 'Failed to getHttpValues: ' + err.message);
        return err
    })
}

export {
    mockNewApi, getHttpKeys,getHttpValues,showMessage
};
