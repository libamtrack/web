import React from 'react';
import { Collapse, Form, Radio } from 'antd';
const Panel = Collapse.Panel;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 12,
    border: 0,
    overflow: 'hidden',
};

const MoreOptionsForm = (props) => {
    const defXValue = props.defaultX === 'log' ? 'log' : 'linear';
    const defYValue = props.defaultY === 'log' ? 'log' : 'linear';
    return (
        <Form layout='horizontal'>
            <Collapse bordered={false}>
                <Panel header={<h6>More plot options</h6>} key="1" style={customPanelStyle}>
                    <FormItem style={{ margin: 6 }} label={'X-Axis'} labelCol={{ span: 5 }}>
                        <RadioGroup onChange={props.handleXChange} defaultValue={defXValue}>
                            <RadioButton value='linear'>Linear</RadioButton>
                            <RadioButton value='log'>Logarithmic</RadioButton>
                        </RadioGroup>
                    </FormItem>
                    <FormItem style={{ margin: 6 }} label={'Y-Axis'} labelCol={{ span: 5 }}>
                        <RadioGroup onChange={props.handleYChange} defaultValue={defYValue}>
                            <RadioButton value='linear'>Linear</RadioButton>
                            <RadioButton value='log'>Logarithmic</RadioButton>
                        </RadioGroup>
                    </FormItem>
                </Panel>
            </Collapse>
        </Form>
    );
}

export default MoreOptionsForm;