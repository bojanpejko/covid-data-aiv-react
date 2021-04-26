import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Form, Input } from 'antd';

import { createAdmin } from '../../redux/actions/admin';


export default function AddAdmin({ open, cancelFunction }){
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    
    const addFunction = () => {
        let modelData = {
            name: form.getFieldValue('name'),
            surname: form.getFieldValue('surname'),
            email : form.getFieldValue('email')
        };
        dispatch(createAdmin(modelData));
        cancelFunction();
    }

    return(
        <Modal
            visible={open}
            title="Add Admin"
            onOk={() => { addFunction() }}
            onCancel = { cancelFunction }
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
                    <Form.Item label="Surname" name="surname">
                        <Input placeholder="Surname" />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input placeholder="Email" />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );

}
