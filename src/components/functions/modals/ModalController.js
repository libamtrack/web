import React from 'react';
import { Modal, Button, Collapse } from 'antd';
import DataSeriesModal from './DataSeriesModal.js';
import ShowDataSeriesModal from './ShowDataModal.js';
import DownloadDataModal from './DownloadDataModal.js';
import { prepareDataToSave, prepareSingleDataToSave } from '../utils/helpers.js';

const Panel = Collapse.Panel;
const confirm = Modal.confirm;

const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 12,
    border: 0,
    overflow: 'hidden',
};

export default class ModalController extends React.Component {
    state = {
        dataSeries: this.props.dataSeries,
        dataSeriesModalVisible: false,
        showDataSeriesModalVisible: false,
        downloadModalVisible: false,
        dataToSave: "empty",
        xToShow: [],
        yToShow: []
    };

    setModalVisible = (modal, visible) => {
        this.setState({ [modal]: visible });
    };

    deleteSingleDataSeries = (uid) => {
        this.props.deleteDataSeries(uid);
    };

    showDataSeries = (uid) => {
        for (let i = 0; i < this.state.dataSeries.length; i++) {
            if (this.state.dataSeries[i].uid === uid) {
                this.setState({ xToShow: this.state.dataSeries[i].x, yToShow: this.state.dataSeries[i].y });
                break;
            }
        }
        this.setModalVisible("showDataSeriesModalVisible", true);
    };

    downloadSingleDataSeries = (dataSeries) => {
        this.setState({ dataToSave: prepareSingleDataToSave(dataSeries) });
        this.setModalVisible("downloadModalVisible", true);
    };

    downloadAll = () => {
        this.setState({ dataToSave: prepareDataToSave(this.state.dataSeries, "haha") });
    };

    showConfirm = (delMethod) => {
        confirm({
            title: 'Are you sure delete all data series?',
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
            <div>
                {this.props.modals ? (
                    <Collapse bordered={false}>
                        <Panel header={<h6>Data series options</h6>} key="2" style={customPanelStyle}>
                            <div style={{ margin: 6 }} align="right">
                                {this.props.modals.dataSeries ? (
                                    <b>
                                        <Button onClick={() => this.setModalVisible("dataSeriesModalVisible", true)}>Data series</Button>
                                        <DataSeriesModal modalVisible={this.state.dataSeriesModalVisible}
                                            setModalVisible={this.setModalVisible}
                                            dataSeries={this.state.dataSeries}
                                            showDataSeries={this.showDataSeries}
                                            deleteDataSeries={this.deleteSingleDataSeries}
                                            downloadDataSeries={this.downloadSingleDataSeries}
                                            name={"dataSeriesModalVisible"}
                                        />
                                        <ShowDataSeriesModal modalVisible={this.state.showDataSeriesModalVisible}
                                            setModalVisible={this.setModalVisible}
                                            xList={this.state.xToShow}
                                            yList={this.state.yToShow}
                                            name={"showDataSeriesModalVisible"}
                                        />
                                    </b>
                                ) : (null)
                                }
                                {this.props.modals.download ? (
                                    <b>
                                        <Button onClick={() => {
                                            this.downloadAll();
                                            this.setModalVisible("downloadModalVisible", true);
                                        }
                                        }>Download</Button>
                                        <DownloadDataModal modalVisible={this.state.downloadModalVisible}
                                            setModalVisible={this.setModalVisible}
                                            content={this.state.dataToSave}
                                            name={"downloadModalVisible"}
                                        />
                                    </b>
                                ) : (null)
                                }
                                {this.props.modals.deleteAll ? (
                                    <Button onClick={() => this.showConfirm(this.props.deleteAll)}>Delete all</Button>
                                ) : (null)
                                }
                            </div>
                        </Panel>
                    </Collapse>
                ) : (null)}
            </div>
        );
    }
}