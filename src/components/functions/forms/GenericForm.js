import React from 'react';

import Button from "antd/es/button/button";

// temporary workaround, waiting for https://github.com/libamtrack/web/issues/596 to be fixed
// Form needs to be migrated to ant design v4
import { Form as LegacyForm } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

import Input from "antd/es/input/Input";
import Tooltip from "antd/es/tooltip/index";
import Select from "antd/es/select/index";


const FormItem = LegacyForm.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

// float in standard or exponential notation
// e.g. -1.5e+2, 2, 10.2E-2, 1E4
const floatPattern = /^[+-]?\d+\.?\d*([eE][+-]?\d+)?$/;
// unsigned int in standard or exponential notation (negative exponent is not allowed)
// e.g. 2, 1e3, 2e+4, 2E6
const uintPattern = /^\d+([eE][+]?\d+)?$/;

const inputFieldWidth = 170;
const textLabelForInputSpan = 13;
const inputFieldSpan = 11;

const inputIdPrefix = "input-id-";

const startName = "start";
const endName = "end";

class FormGenerator extends React.Component {
    state = {
        toRender: "",
        formData: {},
        formItemsCounters: new Set(),
        items: [],
        validateEntryModuleFlag: true
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
            <LegacyForm onSubmit={this.handleSubmit} layout='horizontal' >
                <div>
                    {generatedForm}
                </div>
                    <FormItem style={{ margin: 6 }} label={" "} labelCol={{ span: textLabelForInputSpan }} wrapperCol={{ span: inputFieldSpan }} colon={false}>
                        <Button style={{ width: inputFieldWidth }} type='primary' htmlType='submit'>Submit</Button>
                    </FormItem>
            </LegacyForm>
        );
    };

    createFormItem = (item) => {
        let generatedItem;

        switch (item.type.toLowerCase()) {
            case 'entry_module':
                return this.createEntryModule(item);
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
            <FormItem style={{ margin: 6 }} label={item.label} labelCol={{ span: textLabelForInputSpan }} wrapperCol={{ span: inputFieldSpan }}>
                {generatedItem}
            </FormItem>
        );
    };

    createEntryModule = (item) => {
        const { getFieldDecorator } = this.props.form;
        const startHolder = typeof item.startholder !== 'undefined' ? item.startholder : "0.1";
        const endHolder = typeof item.endholder !== 'undefined' ? item.endholder : "0.9";
        const label = item.label !== undefined ? item.label : "";

        const stepValue = "step";
        const stepDefault = typeof item.stepDefaultValue !== undefined ? item.stepDefaultValue : 0.1;
        const pointsDefault = typeof item.pointsDefaultNumber !== undefined ? item.pointsDefaultNumber : 50;
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
                <FormItem style={{ margin: 6 }} label={"Start " + label} labelCol={{ span: textLabelForInputSpan }} wrapperCol={{ span: inputFieldSpan}}>
                    <Tooltip title={"Insert start value"}>
                        {getFieldDecorator(startName, {
                            rules: [{
                                required: true, message: "Field required!"
                            }, {
                                validator: this.validateEntryModule
                            }],
                            initialValue: startHolder
                        })(
                            <Input style={{ width: inputFieldWidth, textAlign: 'center' }}
                                   parametername={startName}
                                   placeholder={startHolder}
                                   onChange={this.handleEntryInputChange} />
                        )}
                    </Tooltip>
                </FormItem>
                <FormItem style={{ margin: 6 }} label={"End " + label} labelCol={{ span: textLabelForInputSpan }} wrapperCol={{ span: inputFieldSpan }}>
                    <Tooltip title={"Insert end value"}>
                        {getFieldDecorator(endName, {
                            rules: [{
                                required: true, message: "Field required!"
                            }, {
                                validator: this.validateEntryModule
                            }],
                            initialValue: endHolder
                        })(
                            <Input style={{ width: inputFieldWidth, textAlign: 'center' }}
                                   parametername={endName}
                                   placeholder={endHolder}
                                   onChange={this.handleEntryInputChange} />
                        )}
                    </Tooltip>
                </FormItem>
                <FormItem style={{ margin: 6 }} label={'Generate'} labelCol={{ span: textLabelForInputSpan }} wrapperCol={{ span: inputFieldSpan }}>
                    <InputGroup compact>
                        <Select style={{ width: inputFieldWidth/2}}
                            defaultValue={this.state.formData.intervalType === "points" ? "points" : "step"}
                            onChange={this.handleEntryIntervalTypeChange}
                        >
                            <Option value="step">Step</Option>
                            <Option value="points">Points</Option>
                        </Select>
                        <Tooltip title={"Insert interval value or points number"} placement={"right"}>
                            {getFieldDecorator(pointNoName, {
                                rules: [{
                                    pattern: this.state.formData.intervalType === stepValue ? floatPattern : uintPattern, message: "Incorrect value!"
                                }, {
                                    required: true, message: "Please, insert a value!"
                                }],
                                initialValue: this.state.formData.intervalType === stepValue ? stepDefault : pointsDefault
                            })(
                                <Input style={{ width: inputFieldWidth/2 }}
                                       parametername={pointNoName}
                                       placeholder={this.state.formData.intervalType === stepValue ? stepDefault : pointsDefault}
                                       onChange={this.handleEntryInputChange} />
                            )}
                        </Tooltip>
                    </InputGroup>
                </FormItem>
            </div>
        );
    };

    createSingleInputItem = (item) => {
        const { getFieldDecorator } = this.props.form;

        if (!this.state.formItemsCounters.has(item.parameterName)) {
            this.state.formData[item.parameterName] = item.defaultValue ? item.defaultValue : 0.5;
            this.state.formItemsCounters.add(item.parameterName);
        }

        return (
            <div>
                <Tooltip title={typeof item.description !== 'undefined' ? item.description : "Insert value"}>
                    {getFieldDecorator(inputIdPrefix + item.parameterName, {
                        rules: [{
                            required: true, message: "Please, insert a value!"
                        }, {
                            validator: this.validate
                        }],
                        initialValue: typeof item.defaultValue !== undefined ? item.defaultValue : 0.5
                    })(
                        <Input style={{ width: inputFieldWidth, textAlign: 'center' }}
                               parametername={item.parameterName}
                               placeholder={item.placeholder}
                               onChange={this.handleEntryInputChange} />
                    )}
                </Tooltip>
            </div>
        );
    };

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
                    <Select
                        dropdownMatchSelectWidth={false}
                        style={{ width: inputFieldWidth }}
                        onChange={(value) => this.handleSelectChange(item.parameterName, value)}>
                        {list.map(listElem => (
                            <Option key={listElem.name + listElem.value} value={listElem.value}>
                                {listElem.name}
                            </Option>
                        ))}
                    </Select>
                )}
            </Tooltip>
        );
    };

    //HANDLERS -------------------------------------------------------------------------------------------------------------
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.setFormData(this.state.formData);
            }
        });
    };

    handleEntryInputChange = (event) => {
        let newFormData = this.state.formData;
        newFormData[event.target.getAttribute('parametername')] = parseFloat(event.target.value);
        this.setState({
            formData: newFormData
        });
    };

    handleEntryIntervalTypeChange = (value) => {
        let newFormData = this.state.formData;
        newFormData.intervalType = value;
        this.setState({
            formData: newFormData
        });
    };

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
            const pattern = validationRules.type && validationRules.type === "int" ? uintPattern : floatPattern;
            const regObj = RegExp(pattern);
            const fValue = parseFloat(value);

            const startValue = rule.field === startName ? parseFloat(value) : this.state.formData[startName];
            const endValue = rule.field === endName ? parseFloat(value) : this.state.formData[endName];

            if (!regObj.test(value)) {
                callback("Incorrect format!");
            }

            if (validationRules.min && fValue < parseFloat(validationRules.min)) {
                callback("Bad value!");
            }

            if (validationRules.max && fValue > parseFloat(validationRules.max)) {
                callback("Bad value!");
            }

            if ( startValue > endValue){
                callback("Start bigger than end value!");
            } else {
                if(this.state.validateEntryModuleFlag) {
                    this.state.validateEntryModuleFlag = false;
                    this.props.form.validateFields([rule.field === startName ? endName : startName], {force: true});
                } else {
                    this.state.validateEntryModuleFlag = true;

                }
            }
        }

        callback();
    };

    validate = (rule, value, callback) => {
        let validationRules;
        const formItems = this.props.formItems;
        for (let i = 0; i < formItems.length; i++) {
            if (inputIdPrefix + formItems[i].parameterName === rule.field) {
                validationRules = formItems[i].validations;
                break;
            }
        }

        if (value && validationRules) {
            const pattern = validationRules.type && validationRules.type === "int" ? uintPattern : floatPattern;
            const regObj = RegExp(pattern);
            const fValue = parseFloat(value);

            if (!regObj.test(value)) {
                callback("Incorrect format!");
            }

            if (validationRules.min && fValue < parseFloat(validationRules.min)) {
                callback("Minimum value is: " + validationRules.min);
            }

            if (validationRules.max && fValue > parseFloat(validationRules.max)) {
                callback("Maximum value is: " + validationRules.max);
            }

        }

        callback();
    };

    render() {
        const generatedForm = this.generateForm();
        return (
            <div style={{width: "100%"}}>
                {generatedForm}
            </div>
        );
    }
}

const GenericForm = LegacyForm.create()(FormGenerator);
export default GenericForm;