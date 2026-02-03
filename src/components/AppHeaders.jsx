import {Table, Divider, Input, Button, Space, AutoComplete}  from 'antd'
import { useState, useEffect } from 'react'
import { getHttpKeys,getHttpValues } from '../api/ApiClient'


function AppHeaders({dataColumns, setDataColumns}){

    const [keys, setKeys] = useState([])
    const [filterKeys, setFilterKeys] = useState([])
    const [vals, setVals] = useState([])
    const [filterVals, setFilterVals] = useState([])

    // empty dependency, so run only once at start
    useEffect(()=>{
       getHttpKeys().then(data => setKeys(data)).catch(err => {
         showMessage("error", "get http kyes error, "+ err.message)
       })
        getHttpValues().then(data => setVals(data)).catch(err => {
         showMessage("error", "get http value error, "+ err.message)
       })
    },[])

    const handleChange = (value, id, field) => {
        const newData = dataColumns.map(item => {
            if (item.id === id) {
                return {...item, [field]: value}
            }
            return item
        });
        setDataColumns(newData)
    }
    const addRow = () => {
        setDataColumns([...dataColumns, {id: Date.now() + Math.random(), key: '', value: ''}])
    }

    const removeRow = (id) => {
        const newData = dataColumns.filter(item => item.id !== id);
        setDataColumns(newData)
    }

    function handleKeySearch(inputVal) {
        if(!inputVal){
            setFilterKeys([])
            return
        }
        
        const filtered = keys.filter(opt =>
            opt.value.toLowerCase().includes(inputVal.toLowerCase())
        );
        // limit number to 5
        const limited = filtered.slice(0, 5);
        setFilterKeys(limited);
    }

    function handleValueSearch(inputVal) {
        if (!inputVal){
            setFilterVals([])
            return
        }
        const filtered = vals.filter(opt =>
            opt.value.toLowerCase().includes(inputVal.toLowerCase())
        );
        // limit number to 5
        const limited = filtered.slice(0, 5);
        setFilterVals(limited)
    }

    const columns = [
        {
            dataIndex: 'key',
            title: 'Key',
            render: (text, record) => {
                return (
                <AutoComplete style={{width: '100%'}}
                    options={filterKeys}
                    value={text}
                    onSearch={handleKeySearch}
                    onChange={(value) => {
                        handleChange(value, record.id, 'key')
                    }}
                />
                )
            }
        },
        {
            dataIndex: 'value',
            title: 'Value',
            render: (text, record) => {
                return (
                    <AutoComplete style={{width: '100%'}}
                        options={filterVals}
                        value={text}
                        onSearch={handleValueSearch}
                        onChange={(value) => {
                            handleChange(value, record.id, 'value')
                        }}
                    />
                )
            }
        },
        {
            dataIndex: 'action',
            title: 'Action',
            render: (_, record) => {
                return (
                    dataColumns.length > 1 ? (
                        <Button danger onClick={() => removeRow(record.id)}>Remove</Button>
                    ) : null
                )
            }
        }
    ]

    return  (
     <div style={{width: '50%', alignContent: 'center', margin: 'auto'}}>
     <h3>Request Headers</h3>
     <Divider />
     <Table 
        rowKey="id"
        type={'checkbox'}
        columns={columns}
        dataSource={dataColumns}
        pagination={false}
        bordered
     >
     </Table>
     <Space style={{marginTop: '10px'}}>
        <Button type="primary" onClick={addRow}>Add Row</Button>
     </Space>
     </div>
    )
}

export default AppHeaders