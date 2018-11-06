import React from "react";
import { Modal, List, Button } from 'antd';

const confirm = Modal.confirm;

export default class DataSeriesModal extends React.Component {
    showConfirm = (delMethod) => {
        confirm({
            title: 'Are you sure delete these data series?',
            content: 'This operation can\'t be revert!',
            onOk() {
                delMethod();
            },
            onCancel() {
            },
        });
    }

    render() {
        return (
            <Modal
                title="Data series"
                wrapClassName="vertical-center-modal"
                visible={this.props.modalVisible}
                onCancel={() => this.props.setModalVisible(this.props.name, false)}
                footer={
                    <Button type='primary' onClick={() => this.props.setModalVisible(this.props.name, false)}>
                        Ok
                        </Button>
                }
            >
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.dataSeries}
                    renderItem={series => (
                        <List.Item actions={
                            [
                                <a onClick={() => this.props.showDataSeries(series.uid)}>Show</a>,
                                <a onClick={() => this.props.downloadDataSeries(series)}>Download</a>,
                                <a onClick={() => this.showConfirm(
                                    () => this.props.deleteDataSeries(series.uid)
                                )}>Delete</a>
                            ]}>
                            <List.Item.Meta title={series.name} />
                        </List.Item>
                    )}
                />
            </Modal>
        );
    }
}