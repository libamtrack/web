import React from "react";
import { Modal, Button } from 'antd';

export default class ErrorModal extends React.Component {
    printParameters = () => {
        let params = [];
        for (const param in this.props.parameters) {
            params.push(
                <div key={param}>
                    {param}: {this.props.parameters[param]}
                </div>
            );
        }

        return params;
    }

    render() {
        return (
            <Modal
                title="Unknown error"
                wrapClassName="vertical-center-modal"
                visible={this.props.modalVisible}
                onCancel={() => this.props.setModalVisible(false)}
                footer={
                    <Button type='primary' onClick={() => this.props.setModalVisible(false)}>
                        Ok
                    </Button>
                }
            >
                <div>
                    Unknown error when executing library function,
                    consider choosing other input parameters for "<b>{this.props.functionName}</b>"
                </div>
                <div>
                    <br/>
                    <b>Given parameters:</b>
                    {this.printParameters()}
                </div>
            </Modal>
        );
    }
}