import {Table, Divider, Input, Button, Space}  from 'antd'
import { useState } from 'react'


function AppHeaders(){

    const [dataColumns, setDataColumns] = useState([{id: Date.now(), key: '', value: ''}])

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

    const columns = [
        {
            dataIndex: 'key',
            title: 'Key',
            render: (text, record) => {
                return (
                <Input
                    value={text}
                    onChange={(e) => {
                        handleChange(e.target.value, record.id, 'key')
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
                    <Input
                        value={text}
                        onChange={(e) => {
                            handleChange(e.target.value, record.id, 'value')
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