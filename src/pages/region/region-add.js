import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Form, Input, Select } from 'antd';

import { createRegion } from '../../redux/actions/region';

import { getAdmins } from '../../redux/actions/admin'
import {getAdminsSelector } from '../../redux/selectors/adminSelector'

const { Option } = Select;

export default function AddRegion({ open, cancelFunction }){
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const admins = useSelector(getAdminsSelector);

    const mountFunction = () => {
        dispatch(getAdmins());
    }
    
    const addFunction = () => {
        let modelData = {
            name: form.getFieldValue('name'),
            number: form.getFieldValue('number'),
            adminID : form.getFieldValue('admin')
        };
        dispatch(createRegion(modelData));
        cancelFunction();
    }

    React.useEffect(mountFunction, []);

    return(
        <Modal
            visible={open}
            title="Add Region"
            onOk={() => { addFunction() }}
            onCancel={ cancelFunction }
            centered
            width={ 900 }
        >
            <Form
                layout='horizontal'
                form={form}
                style={{ display: 'flex', flexDirection: 'row' }}
            >
                <div style={{ height: "fit-content" }}>
                    <Form.Item label="Name" name="name">
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item label="Number Of Inhabitants" name="number">
                        <Input placeholder="Inhabitants" />
                    </Form.Item>
                    <Form.Item label="Region Administrator" name="admin">
                        <Select>
                            {
                                admins.map(admin => {
                                    return (
                                        <Option key={admin.uuid} value={admin.uuid}>{admin.name}</Option>
                                    );
                                })
                            }
                        </Select>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );

}
