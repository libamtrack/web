import React from "react";
import { Modal, Form, Input, Button, message } from 'antd';

const FormItem = Form.Item;
const InputGroup = Input.Group;

export default class ChangeSeriesNameModal extends React.Component {
    state = {
        seriesName: this.props.currentDataName
    }

    handleInputChange = (event) => {
        this.setState({ seriesName: event.target.value });
    }

    handleSubmit = () => {
        this.props.renameDataSeries(this.props.currentDataName, this.state.seriesName);
        message.success("Successfully changed data series name!");
        this.props.setModalVisible(this.props.name, false);
    }

    render() {
        return (
            <Modal
                title="Change data series name"
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
                    <FormItem style={{ margin: 6 }} label={'Set data series name'} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                        <Input style={{ width: 200 }} name="fileName" onChange={this.handleInputChange} />
                    </FormItem>
                    <div align="right">
                        <Button type='primary' onClick={this.handleSubmit}>Change name</Button>
                    </div>
                </Form>
            </Modal>
        );
    }
}