import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Table, Typography, Breadcrumb, Button, Modal, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import {getRegionsSelector} from "../../redux/selectors/regionSelector"
import {getRegions, deleteRegion} from "../../redux/actions/region"

import AddRegion from "./region-add"
import EditRegion from "./region-edit"

const { Title } = Typography;

export default function Regions(){

    const dispatch = useDispatch();

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editUUID, setEditUUID] = useState(null);

    const models = useSelector(getRegionsSelector);

    const mountFunction = () =>{
        dispatch(getRegions())
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
                    onConfirm={() => { dispatch(deleteRegion(record.uuid)); }}
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
            title: "Status",
            dataIndex: 'status',
            key: 'status',
        }
    ];

    React.useEffect(mountFunction, []);
    return(
        <div>
            <Title style={{ display: 'flex', alignItems: 'center' }}>Regions <Button onClick={() => { setAddModalOpen(true); }} type="primary" style={{ marginLeft: 20 }}>Add</Button> </Title>
            <Table columns={columns} dataSource={models} />
            <AddRegion open = {addModalOpen} cancelFunction={() => { setAddModalOpen(false); }} />
            <EditRegion open={editModalOpen} cancelFunction={() => { setEditModalOpen(false); }} uuid={editUUID} />
        </div>
    )
}