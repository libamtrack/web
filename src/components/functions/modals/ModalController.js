import React from 'react';
import { Modal, Button, Collapse } from 'antd';
import DataSeriesModal from './DataSeriesModal.js';
import ShowDataSeriesModal from './ShowDataModal.js';
import DownloadDataModal from './DownloadDataModal.js';
import ChangeSeriesNameModal from './ChangeSeriesNameModal.js';
import { prepareDataToSave } from '../utils/helpers.js';

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
        dataSeriesNameToShow: "",
        dataSeriesNameToChange: "",
        dataSeries: this.props.dataSeries,
        dataSeriesModalVisible: false,
        showDataSeriesModalVisible: false,
        downloadModalVisible: false,
        changeNameModalVisible: false,
        dataToSave: "empty",
        xToShow: [],
        yToShow: []
    };

    setModalVisible = (modal, visible) => {
        this.setState({ [modal]: visible });
    };

    deleteSingleDataSeries = (name) => {
        this.setModalVisible("dataSeriesModalVisible", false);
        this.props.deleteDataSeries(name);
        this.setModalVisible("dataSeriesModalVisible", true);
    };

    showDataSeries = (name) => {
        for (let i = 0; i < this.state.dataSeries.length; i++) {
            if (this.state.dataSeries[i].name === name) {
                this.setState({ xToShow: this.state.dataSeries[i].x, yToShow: this.state.dataSeries[i].y });
                break;
            }
        }
        this.setState({ dataSeriesNameToShow: name }, () => this.setModalVisible("showDataSeriesModalVisible", true));
    };

    downloadSingleDataSeries = (serie) => {
        this.setModalVisible("dataSeriesModalVisible", false);

        let dataSeries = [];
        dataSeries.push(serie);

        this.setState({ dataToSave: prepareDataToSave(dataSeries, this.props.functionName) });
        this.setModalVisible("downloadModalVisible", true);
        
        this.setModalVisible("dataSeriesModalVisible", true);
    };

    downloadSingleDataSeriesByName = (name) => {
        for (let i = 0; i < this.state.dataSeries.length; i++) {
            if (this.state.dataSeries[i].name === name) {
                this.downloadSingleDataSeries(this.state.dataSeries[i]);
                break;
            }
        }
    };

    showRenameModal = (name) => {
        this.setState({dataSeriesNameToChange: name});
        this.setModalVisible("changeNameModalVisible", true);
    }

    renameDataSeries = (oldName, newName) => {
        this.setModalVisible("dataSeriesModalVisible", false);
        this.props.renameDataSeries(oldName, newName);
        this.setModalVisible("dataSeriesModalVisible", true);
    }

    downloadAll = () => {
        this.setState({ dataToSave: prepareDataToSave(this.state.dataSeries, this.props.functionName) });
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
                                            dataSeries={this.props.dataSeries}
                                            showDataSeries={this.showDataSeries}
                                            showRenameModal={this.showRenameModal}
                                            deleteDataSeries={this.deleteSingleDataSeries}
                                            downloadDataSeries={this.downloadSingleDataSeries}
                                            name={"dataSeriesModalVisible"}
                                        />
                                        <ShowDataSeriesModal modalVisible={this.state.showDataSeriesModalVisible}
                                            setModalVisible={this.setModalVisible}
                                            showRenameModal={this.showRenameModal}
                                            deleteDataSeries={this.deleteSingleDataSeries}
                                            downloadDataSeries={this.downloadSingleDataSeriesByName}
                                            xList={this.state.xToShow}
                                            yList={this.state.yToShow}
                                            dataSeriesName={this.state.dataSeriesNameToShow}
                                            name={"showDataSeriesModalVisible"}
                                        />
                                        <ChangeSeriesNameModal modalVisible={this.state.changeNameModalVisible}
                                            setModalVisible={this.setModalVisible}
                                            currentDataName={this.state.dataSeriesNameToChange}
                                            renameDataSeries={(oldName, newName) => 
                                                this.setState({ dataSeriesNameToChange: oldName }, () => this.renameDataSeries(oldName, newName))}
                                            name={"changeNameModalVisible"}
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