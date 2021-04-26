import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Form, Input, Select } from 'antd';

import { createData } from '../../redux/actions/data';

import { getRegionsSelector } from '../../redux/selectors/regionSelector'
import { getRegions } from '../../redux/actions/region'

const { Option } = Select;

export default function AddData({ open, cancelFunction }){
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const regions = useSelector(getRegionsSelector);

    const mountFunction = () => {
        dispatch(getRegions());
    }

    const addFunction = () => {
        let modelData = {
            infected: form.getFieldValue('infected'),
            hospitalized: form.getFieldValue('hospitalized'),
            tested: form.getFieldValue('tested'),
            regionID: form.getFieldValue('region'),
        };
        dispatch(createData(modelData));
        cancelFunction();
    }

    React.useEffect(mountFunction, []);

    return(
        <Modal
            visible={open}
            title="Add Data"
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
                    <Form.Item label="Infected" name="infected">
                        <Input placeholder="Infected" />
                    </Form.Item>
                    <Form.Item label="Hospitalized" name="hospitalized">
                        <Input placeholder="Hospitalized" />
                    </Form.Item>
                    <Form.Item label="Tested" name="tested">
                        <Input placeholder="Tested" />
                    </Form.Item>
                    <Form.Item label="Region" name="region">
                        <Select>
                            {
                                regions.map(region => {
                                    return (
                                        <Option key={region.uuid} value={region.uuid}>{region.name}</Option>
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
