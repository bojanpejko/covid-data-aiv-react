import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, Spin, Checkbox } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import {updateData, getSingleData} from '../../redux/actions/data'
import { getSingleDataSelector } from '../../redux/selectors/dataSelector'

const { Option } = Select;

export default function EditData({ open, cancelFunction, uuid}){
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const model = useSelector(getSingleDataSelector);

    const updateFunction = () => {
        let modelData = {
            infected: form.getFieldValue('infected'),
            hospitalized: form.getFieldValue('hospitalized'),
            tested : form.getFieldValue('tested')
        };
        dispatch(updateData(uuid, modelData));
        cancelFunction();
    }

    if (uuid == null) {
        return null;
    }

    if (model == undefined && open) {
        dispatch(getSingleData(uuid))
        return (
            <Modal
                visible={open}
                title="Edit Data"
                centered
            >
                <div style={{ height: 300, width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                    <Spin size="large" style={{ height: 'fit-content', alignSelf: 'center' }} ></Spin>
                </div>
            </Modal>
        );
    }

    let recv = false;
    if (model.uuid != uuid && open) {
        dispatch(getSingleData(uuid))
        return (
            <Modal
                visible={open}
                title="Edit Data"
                centered
            >
                <div style={{ height: 300, width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                    <Spin size="large" style={{ height: 'fit-content', alignSelf: 'center' }} ></Spin>
                </div>
            </Modal>
        );
    }
    else if (!recv && open) {
        form.resetFields();
        recv = true;
    }

    return (
        <Modal
            visible={open}
            title="Edit Data"
            onOk={() => { updateFunction() }}
            onCancel={cancelFunction}
            centered
        >
            <Form
                layout='horizontal'
                form={form}
            >
                <Form.Item label= "Infected" name="infected" initialValue={model.infected}>
                    <Input placeholder="Infected"/>
                </Form.Item>
                <Form.Item label="Hospitalized" name="hospitalized" initialValue={model.hospitalized}>
                    <Input placeholder="Hospitalized" />
                </Form.Item>
                <Form.Item label="Tested" name="tested" initialValue={model.tested}>
                    <Input placeholder="Tested" />
                </Form.Item>
            </Form>
        </Modal>
    );

}