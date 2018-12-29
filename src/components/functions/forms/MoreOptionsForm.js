import React from 'react';
import { Collapse, Form, Radio, Tooltip } from 'antd';
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
    const plotTypeVisible = typeof props.plotTypeConf === "undefined" ? false : true;
    const defPlotType = props.plotTypeConf === "points" ? "markers" : "lines";
    return (
        <Form layout='horizontal'>
            <Collapse bordered={false} defaultActiveKey={["1"]}>
                <Panel header={<h6>More plot options</h6>} key="1" style={customPanelStyle}>
                    <FormItem style={{ margin: 6 }} label={'X-Axis'} labelCol={{ span: 5 }}>
                        <Tooltip title={"Change X scale"} placement={"right"}>
                            <RadioGroup onChange={props.handleXChange} defaultValue={defXValue}>
                                <RadioButton style={{ width: 100 }} value='linear'>Linear</RadioButton>
                                <RadioButton style={{ width: 100 }} value='log'>Logarithmic</RadioButton>
                            </RadioGroup>
                        </Tooltip>
                    </FormItem>
                    <FormItem style={{ margin: 6 }} label={'Y-Axis'} labelCol={{ span: 5 }}>
                        <Tooltip title={"Change Y scale"} placement={"right"}>
                            <RadioGroup onChange={props.handleYChange} defaultValue={defYValue}>
                                <RadioButton style={{ width: 100 }} value='linear'>Linear</RadioButton>
                                <RadioButton style={{ width: 100 }} value='log'>Logarithmic</RadioButton>
                            </RadioGroup>
                        </Tooltip>
                    </FormItem>
                    {plotTypeVisible ? (
                        <FormItem style={{ margin: 6 }} label={'Plot as'} labelCol={{ span: 5 }}>
                            <Tooltip title={"Choose plot type"} placement={"right"}>
                                <RadioGroup onChange={props.handlePlotTypeChange} defaultValue={defPlotType}>
                                    <RadioButton style={{ width: 100 }} value='lines'>Line</RadioButton>
                                    <RadioButton style={{ width: 100 }} value='markers'>Points</RadioButton>
                                </RadioGroup>
                            </Tooltip>
                        </FormItem>
                    ) : null
                    }
                </Panel>
            </Collapse>
        </Form >
    );
}

export default MoreOptionsForm;