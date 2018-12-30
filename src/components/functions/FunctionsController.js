import React, { Component } from 'react';
import { Breadcrumb, Col, Icon, Row, Spin, Tooltip } from 'antd';
import PlotComponent from './plots/PlotComponent.js';
import MoreOptionsForm from './forms/MoreOptionsForm.js';
import GenericForm from './forms/GenericForm.js';
import ModalController from './modals/ModalController.js';
import getConfigurationFromJSON from "../../providers/ConfigProvider.js"
import * as FunctionsFromC from '../../functionsFromC/';
import { getDataSeriesName, prepareDataToCalculate, preparePoints } from './utils/helpers';
import packageJson from '../../../package.json';
import { Link } from "react-router-dom";
import ErrorModal from "./modals/ErrorModal";
import Script from 'react-load-script'

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
            plotType: "",
            xType: "",
            yType: ""
        },
        singleResult: 0,
        parametersRules: {},
        isError: false
    };

    componentDidMount() {
        this._asyncRequest = getConfigurationFromJSON(this.props.jsonPath).then(
            confData => {
                this.setState({
                    json: confData
                });
            })
            .then(() => {
                if (this.state.json.moreOptions) {
                    this.state.plot.xType = this.state.json.moreOptions.defaultXAxisType === 'log' ? 'log' : 'linear';
                    this.state.plot.yType = this.state.json.moreOptions.defaultYAxisType === 'log' ? 'log' : 'linear';
                    this.state.plot.plotType = this.state.json.moreOptions.plotType === "points" ? "markers" : "lines";
                }

                for (let i = 0; i < this.state.json.formItems.length; i++) {
                    const formItem = this.state.json.formItems[i];

                    if (formItem.type === "entry_module") {
                        this.setState({ entryName: formItem.parameterName });
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

    componentDidUpdate(props, state, root) {
        try {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, root]);
        } catch (e) { }
    }

    componentWillUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest = null;
        }
    }

    generateContent = () => {
        let componentToRender = (
            <div>
                {this.state.json.isMathJaxSupported && this.state.json.isMathJaxSupported === true ? (
                    <Script url="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=TeX-MML-AM_CHTML" />
                ) : null
                }

                <h3>{this.state.json.visibleName.concat(" ")}
                    <a href={packageJson.repository.concat("/edit/master/src/".concat(this.props.jsonPath))}>
                        <Tooltip title="Edit this page on GitHub!">
                            <Icon type="edit" style={{ fontSize: 20, color: 'black' }} theme='twoTone' />
                        </Tooltip>
                    </a>
                </h3>
                {this.state.json.description}
                <Row>
                    <GenericForm
                        setFormData={this.setFormData}
                        formItems={this.state.json.formItems}
                        dictionaryData={this.props.dictionaryData}
                    />
                </Row>
                {this.state.json.moreOptions && this.state.json.moreOptions.visible === true ? (
                    <MoreOptionsForm
                        handleXChange={this.handleXChange}
                        handleYChange={this.handleYChange}
                        handlePlotTypeChange={this.handlePlotTypeChange}
                        plotTypeConf={this.state.json.moreOptions.plotType}
                        defaultX={this.state.json.moreOptions.defaultXAxisType}
                        defaultY={this.state.json.moreOptions.defaultYAxisType}
                    />
                ) : null
                }
                {<ModalController
                    functionName={this.state.json.visibleName}
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
        if (this.state.formData.start === 0 && event.target.value === "log") {
            alert("Logarithmic scale on X axis requested for invalid lower range value (zero).\n" +
                "Rescaling to [" + this.state.formData.end / 10000 + "," + this.state.formData.end + "] only for logarithmic scale.\n" +
                "Please consider setting new value to lower range border.")
        }

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
                plotType: this.state.plot.plotType,
                xType: event.target.value,
                yType: this.state.plot.yType
            },
            dataSeries: newDataSeries
        });
    };

    handleYChange = (event) => {
        this.setState({
            plot: {
                plotType: this.state.plot.plotType,
                xType: this.state.plot.xType,
                yType: event.target.value
            }
        });
    };

    handlePlotTypeChange = (event) => {
        this.setState({
            plot: {
                plotType: event.target.value,
                xType: this.state.plot.xType,
                yType: this.state.plot.yType
            }
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

        let nAxisTypeX = this.state.plot.xType;
        let nAxisTypeY = this.state.plot.yType;
        let nPlotType = this.state.plot.plotType;

        const nPlot = {
            plotType: nPlotType,
            xType: nAxisTypeX,
            yType: nAxisTypeY
        }

        this.setState({ dataSeries: newDataSeries, plot: nPlot });
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
        let nDataLinear = this.state.dataLinear;
        let nDataPower = this.state.dataPower;
        let nResultLinear = this.state.resultLinear;
        let nResultPower = this.state.resultPower;

        nDataSeries.length = 0;
        nDataSeriesNames.length = 0;
        nDataLinear.length = 0;
        nDataPower.length = 0;
        nResultLinear.length = 0;
        nResultPower.length = 0;

        const nPlot = {
            plotType: this.state.plot.plotType,
            xType: this.state.plot.xType,
            yType: this.state.plot.yType
        }

        this.setState({
            dataSeries: nDataSeries,
            dataSeriesNames: nDataSeriesNames,
            dataLinear: nDataLinear,
            dataPower: nDataPower,
            resultLinear: nResultLinear,
            resultPower: nResultPower,
            plot: nPlot
        });
    };

    calculateSingleResult = () => {
        try {
            const fun = FunctionsFromC[this.state.json.functionName];

            if (typeof fun === undefined) {
                alert("Cannot find function with name: " + this.state.json.functionName);
                return;
            }

            this.setState({ singleResult: fun(this.state.formData) });
        } catch (error) {
            this.setState({ isError: true });
        }
    };

    calculate = () => {
        try {
            const fun = FunctionsFromC[this.state.json.functionName];

            if (typeof fun === undefined) {
                alert("Cannot find function with name: " + this.state.json.functionName);
                return;
            }

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
                x: this.state.plot.xType === 'log' ? dataP : data,
                y: this.state.plot.xType === 'log' ? resP : res,
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
        } catch (error) {
            this.setState({ isError: true });
        }
    };

    render() {
        const size = this.state.json.plot && this.state.json.plot === true ? 8 : 24;
        const unit = this.state.json.resultUnit ? this.state.json.resultUnit : "";
        const prec = this.state.json.resultPrecision ? this.state.json.resultPrecision : 12;
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
                <div style={{ width: '60%' }}>
                    {this.state.toRender}
                    <div style={{ fontSize: 24 }}>
                        Result: {parseFloat(this.state.singleResult.toFixed(prec))} {unit}
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
                <ErrorModal modalVisible={this.state.isError}
                    setModalVisible={(value) => this.setState({ isError: value })}
                    functionName={this.state.json.functionName}
                    parameters={this.state.formData}
                />
            </div>
        );
    }
}