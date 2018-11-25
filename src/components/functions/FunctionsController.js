import React, {Component} from 'react';
import {Breadcrumb, Col, Icon, Row, Spin, Tooltip} from 'antd';
import PlotComponent from './plots/PlotComponent.js';
import MoreOptionsForm from './forms/MoreOptionsForm.js';
import GenericForm from './forms/GenericForm.js';
import ModalController from './modals/ModalController.js';
import getConfigurationFromJSON from "../../providers/ConfigProvider.js"
import * as FunctionsFromC from '../../functionsFromC/';
import {getDataSeriesName, prepareDataToCalculate, preparePoints} from './utils/helpers';
import packageJson from '../../../package.json';
import {Link} from "react-router-dom";

export default class FunctionsController extends Component {
    state = {
        loading: true,
        json: {},
        entryName: "",
        toRender: "",
        dataSeriesNames: [],
        dataSeries: [],
        dataLinear: [],
        dataPower: [],
        resultLinear: [],
        resultPower: [],
        formData: {},
        plot: {
            plotType: "lines",
            xType: "linear",
            yType: "linear"
        },
        singleResult: 0,
        parametersRules: {}
    };

    componentDidMount() {
        this._asyncRequest = getConfigurationFromJSON(this.props.jsonPath).then(
            confData => {
                this.setState({
                    json: confData
                });
            })
            .then(() => {
                for (let i = 0; i < this.state.json.formItems.length; i++) {
                    const formItem = this.state.json.formItems[i];

                    if (formItem.type === "entry_module") {
                        this.setState({ entryName: formItem.parameterName });
                    }

                    if (formItem.type === "plot_type") {
                        const value = formItem.defaultValue ? formItem.defaultValue : "markers";
                        this.state.plot["plotType"] = value === "points" ? "markers" : "lines";
                    }

                    if (formItem.asManyAsPoints) {
                        let newData = this.state.parametersRules;
                        newData[formItem.parameterName] = true;

                        this.setState({
                            parametersRules: newData
                        });
                    }
                }
            })
            .then(this.generateContent)
    }

    componentWillUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest = null;
        }
    }

    generateContent = () => {
        let componentToRender = (
            <div>
                <h3>{this.state.json.visibleName.concat(" ")}
                <a href={ packageJson.repository.concat("/edit/master/src/".concat(this.props.jsonPath))}>
                    <Tooltip title="Edit this page on GitHub!">
                        <Icon type="edit" style={{fontSize: 20, color: 'black'}} theme='twoTone'/>
                    </Tooltip>
                </a>
                </h3>
                {this.state.json.description}
                <Row>
                    <GenericForm
                        setFormData={this.setFormData}
                        formItems={this.state.json.formItems}
                        dictionaryData={this.props.dictionaryData}
                        handlePlotTypeChange={this.handlePlotTypeChange}
                    />
                </Row>
                {this.state.json.moreOptions && this.state.json.moreOptions === true ? (
                    <MoreOptionsForm handleXChange={this.handleXChange} handleYChange={this.handleYChange} />
                ) : null
                }
                {<ModalController
                    modals={this.state.json.modals}
                    dataSeries={this.state.dataSeries}
                    deleteDataSeries={this.deleteDataSeries}
                    deleteAll={this.deleteAll}
                    renameDataSeries={this.renameDataSeries}
                />}
            </div>
        );

        this.setState({ toRender: componentToRender, loading: false });
    };

    handleXChange = (event) => {
        let newDataSeries = this.state.dataSeries;
        if (this.state.plot.xType === "linear" && event.target.value === "log") {
            for (let i = 0; i < newDataSeries.length; i++) {
                newDataSeries[i].x = this.state.dataPower[i];
                newDataSeries[i].y = this.state.resultPower[i];
            }
        }
        if (!(this.state.plot.xType === "linear") && event.target.value === "linear") {
            for (let i = 0; i < newDataSeries.length; i++) {
                newDataSeries[i].x = this.state.dataLinear[i];
                newDataSeries[i].y = this.state.resultLinear[i];
            }
        }
        this.setState({
            plot: {
                xType: event.target.value,
                yType: this.state.plot.yType
            },
            dataSeries: newDataSeries
        });
    };

    handleYChange = (event) => {
        this.setState({
            plot: {
                xType: this.state.plot.xType,
                yType: event.target.value
            }
        });
    };

    handlePlotTypeChange = (event) => {
        this.setState({
            plot: { plotType: event.target.value }
        });
    };

    setFormData = (data) => {
        this.setState({ formData: data },
            () => this.state.json.plot === true ? this.calculate() : this.calculateSingleResult());
    };

    renameDataSeries = (oldName, newName) => {
        let newDataSeries = this.state.dataSeries;
        for (let i = 0; i < this.state.dataSeries.length; i++) {
            if (this.state.dataSeries[i].name === oldName) {
                newDataSeries[i].name = newName;
            }
        }

        this.setState({ dataSeries: newDataSeries });
    }

    deleteDataSeries = (name) => {
        let newDataSeries = this.state.dataSeries;
        let newDataLinear = this.state.dataLinear;
        let newResLinear = this.state.resultLinear;
        let newDataPower = this.state.dataPower;
        let newResPower = this.state.resultPower;

        for (let i = 0; i < this.state.dataSeries.length; i++) {
            if (this.state.dataSeries[i].name === name) {
                newDataSeries.splice(i, 1);
                newDataLinear.splice(i, 1);
                newDataPower.splice(i, 1);
                newResLinear.splice(i, 1);
                newResPower.splice(i, 1);

                break;
            }
        }

        let newDataSeriesNames = this.state.dataSeriesNames;
        if (newDataSeries.length === 0) {
            newDataSeriesNames.length = 0;
        }

        this.setState({
            dataSeriesNames: newDataSeriesNames,
            dataSeries: newDataSeries,
            dataLinear: newDataLinear,
            resultLinear: newResLinear,
            dataPower: newDataPower,
            resultPower: newResPower
        });
    };

    deleteAll = () => {
        let nDataSeries = this.state.dataSeries;
        let nDataSeriesNames = this.state.dataSeriesNames;

        nDataSeries.length = 0;
        nDataSeriesNames.length = 0;

        this.setState({ dataSeries: nDataSeries, dataSeriesNames: nDataSeriesNames });
    };

    calculateSingleResult = () => {
        const fun = FunctionsFromC[this.state.json.functionName];
        this.setState({ singleResult: fun(this.state.formData) });
    };

    calculate = () => {
        const fun = FunctionsFromC[this.state.json.functionName];
        let newDataSeries = this.state.dataSeries;

        let generatedPoints = preparePoints(
            this.state.formData.start,
            this.state.formData.end,
            this.state.formData.pointsNo,
            this.state.formData.intervalType
        );

        let data = generatedPoints.lin;
        let dataLinear = this.state.dataLinear;
        dataLinear.push(data);

        let dataP = generatedPoints.log;
        let dataPower = this.state.dataPower;
        dataPower.push(dataP);

        let res = fun(prepareDataToCalculate(this.state.entryName, data, this.state.formData, this.state.parametersRules));
        let resLinear = this.state.resultLinear;
        resLinear.push(res);

        let resP = fun(prepareDataToCalculate(this.state.entryName, dataP, this.state.formData, this.state.parametersRules));
        let resPower = this.state.resultPower;
        resPower.push(resP);

        const dataSeriesName = getDataSeriesName(this.state.dataSeriesNames, this.state.entryName);
        this.state.dataSeriesNames.push(dataSeriesName);

        newDataSeries.push({
            x: data,
            y: res,
            name: dataSeriesName,
            type: 'scatter',
            mode: this.state.plot.plotType
        });

        this.setState({
            dataSeries: newDataSeries,
            dataLinear: dataLinear,
            resultLinear: resLinear,
            dataPower: dataPower,
            resultPower: resPower
        });
    };

    render() {
        const size = this.state.json.plot && this.state.json.plot === true ? 8 : 24;
        const unit = this.state.json.unit ? this.state.json.unit : "";
        const resultComp = this.state.json.plot && this.state.json.plot === true ? (
            <div>
                <Col span={size}>
                    {this.state.toRender}
                </Col>
                <Col span={24 - size}>
                    <PlotComponent dataSeries={this.state.dataSeries}
                        xTitle={this.state.json.xTitle}
                        yTitle={this.state.json.yTitle}
                        xType={this.state.plot.xType}
                        yType={this.state.plot.yType} />
                </Col>
            </div>
        ) : (
                <div>
                    {this.state.toRender}
                    <div style={{ fontSize: 24 }}>
                        Result: {this.state.singleResult} {unit}
                    </div>
                </div>
            );
        return (
            <div>
            <Breadcrumb>
                <Breadcrumb.Item><Link to={"/"}>Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item>{this.state.json.visibleName}</Breadcrumb.Item>
            </Breadcrumb>
            <Row type='flex' gutter={8} align='top'>
                {this.state.loading ? <Spin spinning={this.state.loading} /> : resultComp}
            </Row>
            </div>
        );
    }
}