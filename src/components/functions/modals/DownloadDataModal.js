import React from "react";
import { Modal, List, Form, Select, Input, Button } from 'antd';
import { saveAs } from 'file-saver';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

export default class DownloadDataModal extends React.Component {
    state = {
        fileName: "data_series",
        fileFormat: "csv"
    };

    handleInputChange = (event) => {
        this.setState({ fileName: event.target.value });
    }

    handleOptionChange = (value) => {
        this.setState({ fileFormat: value });
    }

    handleDownload = () => {
        const { fileName, fileFormat } = this.state;
        const { content } = this.props;
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `${fileName}.${fileFormat}`);
    }

    render() {
        return (
            <Modal
                title="Download data"
                wrapClassName="vertical-center-modal"
                visible={this.props.modalVisible}
                onCancel={() => this.props.setModalVisible(this.props.name, false)}
                footer={
                    <Button type='back' onClick={() => this.props.setModalVisible(this.props.name, false)}>
                        Cancel
                    </Button>
                }
            >
                <Form layout='horizontal'>
                    <FormItem style={{ margin: 6 }} label={'Set file name'} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                        <InputGroup compact>
                            <Input style={{ width: 200 }} name="fileName" onChange={this.handleInputChange} />
                            <Select style={{ width: 100 }} defaultValue="csv" onChange={this.handleOptionChange}>
                                <Option value="csv">csv</Option>
                                <Option value="txt">txt</Option>
                            </Select>
                        </InputGroup>
                    </FormItem>
                    <div align="right">
                        <Button type='primary' htmlType='submit' onClick={this.handleDownload}>Download</Button>
                    </div>
                </Form>
            </Modal>
        );
    }
}