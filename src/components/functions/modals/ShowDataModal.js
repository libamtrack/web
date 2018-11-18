import React from "react";
import { Row, Col, Modal, Button } from 'antd';

const ShowDataSeriesModal = (props) => {
    let i = 0;
    return (
        <Modal
            title="Show data series"
            wrapClassName="vertical-center-modal"
            visible={props.modalVisible}
            onCancel={() => props.setModalVisible(props.name, false)}
            footer={
                <div>
                    <Button type='primary' onClick={() => props.setModalVisible(props.name, false)}>
                        Ok
                    </Button>
                    <Button onClick={() => props.downloadDataSeries(props.dataSeriesName)}>
                        Download
                    </Button>
                    <Button onClick={() => {
                        props.deleteDataSeries(props.dataSeriesName);
                        props.setModalVisible(props.name, false);
                    }}>
                        Delete
                    </Button>
                </div>
            }
        >
            <Row type='flex' gutter={20} align="center">
                <Col span={10} align="center">
                    <p>{"x"}</p>
                    {props.xList.map(x => (
                        <p>{x}</p>))}
                </Col>
                <Col span={10} align="center">
                    <p>{"y"}</p>
                    {props.xList.map(x => (
                        <p>{props.yList[i++]}</p>))}
                </Col>
            </Row>
        </Modal>
    );
}

export default ShowDataSeriesModal;