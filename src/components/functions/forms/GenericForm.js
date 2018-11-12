import React from 'react';
import { Col, Tooltip, Button, Form, Input, Radio, Select } from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

const floatPattern = /^\d+\.?\d*$/;
const intPattern = /^\d+$/;

class FormGenerator extends React.Component {
    state = {
        toRender: "",
        formData: {},
        formItemsCounters: new Set(),
        items: []
    };

    //GENERATORS --------------------------------------------------------------------
    generateForm = () => {
        let generatedForm = [];
        const formItems = this.props.formItems;
        let i;
        for (i = 0; i < formItems.length; i++) {
            let item = formItems[i];
            generatedForm.push(
                <div key={item.type + i}>
                    {this.createFormItem(item)}
                </div>
            );
        }

        return (
            <Form onSubmit={this.handleSubmit} layout='horizontal'>
                <div>
                    {generatedForm}
                </div>
                <div style={{ margin: 6, width: 340 }} align="center">
                    <Button style={{ width: 175 }} type='primary' htmlType='submit'>Submit</Button>
                </div>
            </Form>
        );
    }

    createFormItem = (item) => {
        let generatedItem;

        switch (item.type.toLowerCase()) {
            case 'entry_module':
                return this.createEntryModule(item);
            case 'plot_type':
                return this.createPlotTypeItem(item);
            case 'input':
                generatedItem = this.createSingleInputItem(item);
                break;
            case 'select':
                generatedItem = this.createSelectItem(item);
                break;
            default:
                alert("Unsupported item type!");
                return;
        }

        return (
            <FormItem style={{ margin: 6 }} label={item.label} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                {generatedItem}
            </FormItem>
        );
    }

    createEntryModule = (item) => {
        const { getFieldDecorator } = this.props.form;
        const startHolder = typeof item.startholder !== 'undefined' ? item.startholder : "0.1";
        const endHolder = typeof item.endholder !== 'undefined' ? item.endholder : "0.9";

        const stepValue = "step";
        const stepDefault = 0.1;
        const pointsDefault = 50;
        const startName = "start";
        const endName = "end";
        const pointNoName = "pointsNo";

        if (!this.state.formItemsCounters.has(item.parameterName)) {
            this.state.formData["intervalType"] = item.intervalType ? item.intervalType : stepValue;
            this.state.formData[startName] = parseFloat(startHolder);
            this.state.formData[endName] = parseFloat(endHolder);
            this.state.formData[pointNoName] = this.state.formData.intervalType === stepValue ? stepDefault : pointsDefault;
            this.state.formItemsCounters.add(item.parameterName)
        }

        return (
            <div>
                <InputGroup>
                    <Col style={{ height: 48 }} offset={2} span={10}>
                        <FormItem style={{ margin: 6 }} label='Start' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                            <Tooltip title={"Insert start value"}>
                                {getFieldDecorator(startName, {
                                    rules: [{
                                        required: true, message: "Field required!"
                                    }, {
                                        validator: this.validateEntryModule
                                    }],
                                    initialValue: startHolder
                                })(
                                    <Input style={{ width: 87.5, textAlign: 'center' }}
                                        name={startName}
                                        placeholder={startHolder}
                                        onChange={this.handleEntryInputChange} />
                                )}
                            </Tooltip>
                        </FormItem>
                    </Col>
                    <Col style={{ height: 48 }} offset={0} span={8}>
                        <FormItem style={{ margin: 6 }} label='End' labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
                            <Tooltip title={"Insert end value"}>
                                {getFieldDecorator(endName, {
                                    rules: [{
                                        required: true, message: "Field required!"
                                    }, {
                                        validator: this.validateEntryModule
                                    }],
                                    initialValue: endHolder
                                })(
                                    <Input style={{ width: 87.5, textAlign: 'center' }}
                                        name={endName}
                                        placeholder={endHolder}
                                        onChange={this.handleEntryInputChange} />
                                )}
                            </Tooltip>
                        </FormItem>
                    </Col>
                </InputGroup>
                <FormItem style={{ margin: 6 }} label={'Generate'} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                    <InputGroup compact>
                        <Select style={{ width: 87.5 }} defaultValue="step" onChange={this.handleEntryIntervalTypeChange}>
                            <Option value="step">Step</Option>
                            <Option value="points">Points</Option>
                        </Select>
                        <Tooltip title={"Insert interval value or points number"} placement={"right"}>
                            {getFieldDecorator(pointNoName, {
                                rules: [{
                                    pattern: this.state.formData.intervalType === stepValue ? floatPattern : intPattern, message: "Incorrect value!"
                                }, {
                                    required: true, message: "Please, insert a value!"
                                }],
                                initialValue: this.state.formData.intervalType === stepValue ? stepDefault : pointsDefault
                            })(
                                <Input style={{ width: 87.5 }}
                                    name={pointNoName}
                                    placeholder={this.state.formData.intervalType === stepValue ? stepDefault : pointsDefault}
                                    onChange={this.handleEntryInputChange} />
                            )}
                        </Tooltip>
                    </InputGroup>
                </FormItem>
            </div>
        );
    }

    createPlotTypeItem = (item) => {
        if (item.visible && item.visible == true) {
            let defValue = item.defaultValue ? item.defaultValue : "markers";
            defValue = defValue === "points" ? "markers" : "lines";

            return (
                <FormItem style={{ margin: 6 }} label={'Plot as'} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                    <Tooltip title={"Choose plot type"} placement={"right"}>
                        <RadioGroup onChange={this.props.handlePlotTypeChange} defaultValue={defValue}>
                            <RadioButton style={{ width: 87.5 }} value='lines'>Line</RadioButton>
                            <RadioButton style={{ width: 87.5 }} value='markers'>Points</RadioButton>
                        </RadioGroup>
                    </Tooltip>
                </FormItem>
            );
        }
    }

    createSingleInputItem = (item) => {
        const { getFieldDecorator } = this.props.form;

        console.log(this.state.formItemsCounters)

        if (!this.state.formItemsCounters.has(item.parameterName)) {
            this.state.formData[item.parameterName] = item.defaultValue ? item.defaultValue : 0.5;
            this.state.formItemsCounters.add(item.parameterName);
        }

        return (
            <div>
                <Tooltip title={typeof item.description !== 'undefined' ? item.description : "Insert value"}>
                    {getFieldDecorator(item.parameterName, {
                        rules: [{
                            required: true, message: "Please, insert a value!"
                        }, {
                            validator: this.validate
                        }],
                        initialValue: item.defaultValue ? item.defaultValue : 0.5
                    })(
                        <Input style={{ width: 175, textAlign: 'center' }}
                            name={item.parameterName}
                            placeholder={item.placeholder}
                            onChange={this.handleEntryInputChange} />
                    )}
                </Tooltip>
            </div>
        );
    }

    createSelectItem = (item) => {
        const { getFieldDecorator } = this.props.form;
        const list = typeof this.props.dictionaryData[item.values] !== 'undefined' ? this.props.dictionaryData[item.values] : [{ name: "m1", number: 1 }, { name: "m2", number: 2 }]
        const tip = typeof item.description !== 'undefined' ? item.description : "Select option";

        const defValue = item.defaultValue ? item.defaultValue : list[0];

        if (!this.state.formItemsCounters.has(item.parameterName)) {
            this.state.formData[item.parameterName] = defValue;
            this.state.formItemsCounters.add(item.parameterName);
        }

        return (
            <Tooltip title={tip} placement={"right"}>
                {getFieldDecorator(item.label, {
                    rules: [{
                        required: true, message: "Please, select a value!"
                    }],
                    initialValue: defValue
                })(
                    <Select onChange={(value) => this.handleSelectChange(item.parameterName, value)}>
                        {list.map(listElem => (
                            <Option key={listElem.name + listElem.value} value={listElem.value}>
                                {listElem.name}
                            </Option>
                        ))}
                    </Select>
                )}
            </Tooltip>
        );
    }

    //HANDLERS -------------------------------------------------------------------------------------------------------------
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.setFormData(this.state.formData);
            }
        });
    }

    handleEntryInputChange = (event) => {
        let newFormData = this.state.formData;
        newFormData[event.target.name] = parseFloat(event.target.value);
        console.log(newFormData);
        this.setState({
            formData: newFormData
        });
    }

    handleEntryIntervalTypeChange = (value) => {
        let newFormData = this.state.formData;
        newFormData.intervalType = value
        this.setState({
            formData: newFormData
        });
    }

    handleSelectChange = (name, value) => {
        let newFormData = this.state.formData;
        newFormData[name] = value;
        this.setState({
            formData: newFormData
        });
    };

    //VALIDATORS
    validateEntryModule = (rule, value, callback) => {
        let validationRules;
        const formItems = this.props.formItems;
        for (let i = 0; i < formItems.length; i++) {
            if (formItems[i].type === "entry_module") {
                validationRules = formItems[i].validations;
                break;
            }
        }

        if (value && validationRules) {
            const pattern = validationRules.type && validationRules.type === "int" ? intPattern : floatPattern;
            const regObj = RegExp(pattern);
            const fValue = parseFloat(value);

            if (!regObj.test(value)) {
                callback("Bad value!");
            }

            if (validationRules.min && fValue < parseFloat(validationRules.min)) {
                callback("Bad value!");
            }

            if (validationRules.max && fValue > parseFloat(validationRules.max)) {
                callback("Bad value!");
            }
        }

        callback();
    }

    validate = (rule, value, callback) => {
        let validationRules;
        const formItems = this.props.formItems;
        for (let i = 0; i < formItems.length; i++) {
            if (formItems[i].name === rule.field) {
                validationRules = formItems[i].validations;
                break;
            }
        }

        if (value && validationRules) {
            const pattern = validationRules.type && validationRules.type === "int" ? intPattern : floatPattern;
            const regObj = RegExp(pattern);
            const fValue = parseFloat(value);

            if (!regObj.test(value)) {
                callback("Bad value!");
            }

            if (validationRules.min && fValue < parseFloat(validationRules.min)) {
                callback("Bad value!");
            }

            if (validationRules.max && fValue > parseFloat(validationRules.max)) {
                callback("Bad value!");
            }
        }

        callback();
    }

    render() {
        const generatedForm = this.generateForm();
        return (
            <div>
                {generatedForm}
            </div>
        );
    }
}

const GenericForm = Form.create()(FormGenerator);
export default GenericForm;