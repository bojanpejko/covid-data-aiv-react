import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Table, Typography, Breadcrumb, Button, Modal, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import {getAdminsSelector} from "../../redux/selectors/adminSelector"
import {getAdmins, deleteAdmin} from "../../redux/actions/admin"

import AddAdmin from "./admin-add"

const { Title } = Typography;

export default function Admins(){

    const dispatch = useDispatch();

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editUUID, setEditUUID] = useState(null);

    const models = useSelector(getAdminsSelector);

    const mountFunction = () =>{
        dispatch(getAdmins())
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
                    onConfirm={() => { dispatch(deleteAdmin(record.uuid)); }}
                >
                    <Button type='danger'><DeleteOutlined /></Button>
                </Popconfirm>
            </div>
            )
        },
        {
            title: "Name",
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: "Surname",
            dataIndex: 'surname',
            key: 'surname',
        },
        {
            title: "E-mail",
            dataIndex: 'email',
            key: 'email',
        }
    ];

    React.useEffect(mountFunction, []);
    return(
        <div>
            <Title style={{ display: 'flex', alignItems: 'center' }}>Region Administrators<Button onClick={() => { setAddModalOpen(true); }} type="primary" style={{ marginLeft: 20 }}>Add</Button> </Title>
            <Table columns={columns} dataSource={models} />
            <AddAdmin open = {addModalOpen} cancelFunction={() => { setAddModalOpen(false); }} />
        </div>
    )
}