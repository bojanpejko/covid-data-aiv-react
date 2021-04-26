import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, Spin, Checkbox } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import {updateRegion, getRegion} from '../../redux/actions/region'
import { getRegionSelector } from '../../redux/selectors/regionSelector'

const { Option } = Select;

export default function EditRegion({ open, cancelFunction, uuid}){
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const model = useSelector(getRegionSelector);

    const updateFunction = () => {
        let modelData = {
            name: form.getFieldValue('name'),
            number: form.getFieldValue('number')
        };
        dispatch(updateRegion(uuid, modelData));
        cancelFunction();
    }

    if (uuid == null) {
        return null;
    }

    if (model == undefined && open) {
        dispatch(getRegion(uuid))
        return (
            <Modal
                visible={open}
                title="Edit Region"
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
        dispatch(getRegion(uuid))
        return (
            <Modal
                visible={open}
                title="Edit Region"
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
            title="Edit Region"
            onOk={() => { updateFunction() }}
            onCancel={cancelFunction}
            centered
        >
            <Form
                layout='horizontal'
                form={form}
            >
                <Form.Item label= "Name" name="name" initialValue={model.name}>
                    <Input placeholder="Name"/>
                </Form.Item>
                <Form.Item label="Number of Inhabitants" name="number" initialValue={model.number}>
                    <Input placeholder="Number of Inhabitants" />
                </Form.Item>
            </Form>
        </Modal>
    );

}