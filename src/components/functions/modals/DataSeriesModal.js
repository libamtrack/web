import React from "react";
import { Modal, List, Button } from 'antd';

const confirm = Modal.confirm;

export default class DataSeriesModal extends React.Component {
    state = {
        dataSeries: this.props.dataSeries
    }

    removeDataSeries = (name) => {
        let newDataSeries = this.state.dataSeries;

        for (let i = 0; i < this.state.dataSeries.length; i++) {
            if (this.state.dataSeries[i].name === name) {
                console.log(this.state.dataSeries[i], name);
                newDataSeries.splice(i, 1);
                break;
            }
        }

        this.setState({
            dataSeries: newDataSeries
        }, () => this.props.deleteDataSeries(name));
    }

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
                                <a onClick={() => this.props.showDataSeries(series.name)}>Show</a>,
                                <a onClick={() => this.props.downloadDataSeries(series)}>Download</a>,
                                <a onClick={() => this.showConfirm(
                                    () => this.removeDataSeries(series.name)
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