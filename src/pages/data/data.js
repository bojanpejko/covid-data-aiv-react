import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Table, Typography, Button, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import {getDataSelector} from "../../redux/selectors/dataSelector"
import {getData, deleteData} from "../../redux/actions/data"

import AddData from "./data-add"
import EditData from "./data-edit"

const { Title } = Typography;

export default function Data(){

    const dispatch = useDispatch();

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editUUID, setEditUUID] = useState(null);

    const models = useSelector(getDataSelector);

    const mountFunction = () =>{
        dispatch(getData())
    }

    const columns = [
        {
            key: 'uuid',
            title: 'Actions',
            width: 50,
            render: (record) => (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Button style={{ marginRight: 10 }} primary="true" onClick={() => { setEditUUID(record.uuid); setEditModalOpen(true); }}><EditOutlined /></Button>
                <Popconfirm
                    title="Confirm Delete"
                    okText="Delete"
                    cancelText="Cancel"
                    onConfirm={() => { dispatch(deleteData(record.uuid)); }}
                >
                    <Button type='danger'><DeleteOutlined /></Button>
                </Popconfirm>
            </div>
            )
        },
        {
            title: "Date",
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: "Infected",
            dataIndex: 'infected',
            key: 'infected',
        },
        {
            title: "Hospitalized",
            dataIndex: 'hospitalized',
            key: 'hospitalized',
        },
        {
            title: "Tested",
            dataIndex: 'tested',
            key: 'tested',
        }
    ];

    React.useEffect(mountFunction, []);
    return(
        <div>
            <Title style={{ display: 'flex', alignItems: 'center' }}>Infected Data <Button onClick={() => { setAddModalOpen(true); }} type="primary" style={{ marginLeft: 20 }}>Add</Button> </Title>
            <Table columns={columns} dataSource={models} />
            <AddData open = {addModalOpen} cancelFunction={() => { setAddModalOpen(false); }} />
            <EditData open={editModalOpen} cancelFunction={() => { setEditModalOpen(false); }} uuid={editUUID} />
        </div>
    )
}