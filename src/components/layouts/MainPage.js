import React from "react";
import getConfigurationFromJSON from "../../providers/ConfigProvider";
import logo from '../../static/img/logo.png'
import FunctionsView from '../layouts/FunctionsView.js';
import SearchBox from "../functions/utils/SearchBox";
import Layout from "antd/es/layout/layout";
import Row from "antd/es/row/index";
import Col from "react-bootstrap/es/Col";
import ListGroup from "react-bootstrap/es/ListGroup";
import ListGroupItem from "react-bootstrap/es/ListGroupItem";
import Route from "react-router-dom/es/Route";
import Link from "react-router-dom/es/Link";
import packageJson from '../../../package.json';

const { Header, Content, Footer } = Layout;

class MainPage extends React.Component {
    state = {
        applicationTile: "",
        introText: "",
        footer: "",
        categories: [],
        funs: [],
        rows: "",
        routes: "",
        dictionariesPaths: [],
        dictionaryData: {}
    };

    generateRoutes = () => {
        var routes = [];
        this.state.categories.map(category => (
            category.functions.map(fun => (
                routes.push(
                    <Route key={fun.name + "RouteKey" + Math.random().toString(36).substring(7)} path={'/' + category.name.replace(/ /g, '') + '/' + fun.name.replace(/ /g, '')} render={() =>
                        <FunctionsView
                            openKey={category.name.replace(/ /g, '')}
                            selectedKey={category.name.replace(/ /g, '') + fun.name.replace(/ /g, '')}
                            jsonPath={'static/json/' + fun.jsonConfigPath}
                            allFunctions={this.state.funs}
                            footer={this.state.footer}
                            dictionaryData={this.state.dictionaryData}
                        />
                    } />)
            ))
        ));
        this.setState({ routes: routes })
    };

    getDictionaries = () => {
        for (let i = 0; i < this.state.dictionariesPaths.length; i++) {
            const name = this.state.dictionariesPaths[i].name;
            const path = this.state.dictionariesPaths[i].jsonConfigPath;

            getConfigurationFromJSON('static/json/' + path).then(
                conf => {
                    let newData = this.state.dictionaryData;
                    newData[name] = conf;

                    this.setState({
                        dictionaryData: newData
                    });
                }
            );
        }
    };

    componentDidMount() {
        this._asyncRequest = getConfigurationFromJSON('static/json/GlobalConfig.json')
            .then(
                confData => {
                    this.state.applicationTile = confData.applicationTile;
                    this.state.categories = confData.categories;
                    this.state.introText = confData.introText;

                    let bundleAnalyzeReportOnlyAtWebDev = packageJson.homepage.indexOf("web_dev") === -1 ? "" : <Row><a href="report.html" target="_blank">{"See the bundle.js analyze"}</a></Row>;

                    this.state.footer =
                    <Footer key={"footer"} style={{ textAlign: 'center', background: '#fff' }}>
                        <Row>{confData.footerText1}</Row>
                        <Row style={{  'font-size': '10px' }}>{confData.footerText2}</Row>
                        <Row>{"Deploy date: " + confData.deployDate + " from branch: "
                        + confData.deployBranch + " and commit number: " + confData.deployCommit}</Row>
                        {bundleAnalyzeReportOnlyAtWebDev}
                    </Footer>;

                    this.state.dictionariesPaths = confData.dictionaries;
                })
            .then(this.getDictionaries)
            .then(e => {

                this.state.categories.forEach(cat => cat.functions.forEach(fun => this.state.funs.push({ fun, cat })));
                this.state.funs = this.state.funs.sort(function (a, b) {
                    return (a.fun.name.toLowerCase()).localeCompare(b.fun.name.toLowerCase());
                });
                let searchStyle = JSON.parse(JSON.stringify(this.state.categories[0].style));
                searchStyle["width"] = "170%";
                let numberOfRows = Math.ceil(this.state.categories.length / 4);
                let categoriesForColumns = [[], [], [], []];
                for (let i = 0, j = 0; i < numberOfRows; i++) {
                    let numberOfCategories = (j + 1) < numberOfRows ? 4 : (this.state.categories.length - ((numberOfRows - 1) * 4));
                    for (let k = 0; k < numberOfCategories; k++) {
                        categoriesForColumns[k].push(this.state.categories[4 * j + k])
                    }
                    j++;
                }
                this.setState({
                    rows:
                        (<div>
                            <Row key={1} type='flex' gutter={10} align="center" style={{ paddingBottom: 25, paddingLeft: 25, paddingRight: 25 }}>
                                {this.state.introText}
                            </Row>
                            <Row key={2} type='flex' gutter={10} align="center" style={{ paddingBottom: 25 }}>
                                <SearchBox
                                    searchFuns={this.state.funs}
                                    searchStyle={searchStyle}
                                />
                            </Row>
                            <Row key={3} type='flex' gutter={10} align="center" style={{ paddingBottom: 25 }}>
                                {categoriesForColumns.map((colums, index) => (
                                    <Col span={6} key={index} style={{ paddingLeft: 10, width: 320}}>
                                        {colums.map(category => (
                                            <ListGroup align="center" style={{ paddingBottom: 50 }} key={category.name + "ListGroup"}>
                                                <ListGroupItem active align="center"
                                                    style={category.style} key={category.name}>{category.name}</ListGroupItem>
                                                {category.functions.map(fun => (
                                                    <ListGroupItem key={fun.name}>
                                                        <Link
                                                            to={'/' + category.name.replace(/ /g, '') + '/' + fun.name.replace(/ /g, '')}
                                                            style={category.functionsStyle}>
                                                            {fun.name}
                                                        </Link>
                                                    </ListGroupItem>
                                                ))}
                                            </ListGroup>
                                        ))}
                                    </Col>
                                ))}
                            </Row>
                        </div>
                        )
                })
            })
            .then(this.generateRoutes);
    }

    componentWillUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest = null;
        }
    }

    render() {
        return (
            <div>
                <Route key={"mainRoute"} exact={true} path={"/"} render={() => (
                    <Layout key={"mainLayout"} className="layout">
                        {/*LOGO*/}
                        <Header key={"logoHeader"} style={{ background: "#fff", height: "200px" }}>
                            <Row key={"logoRow"} type='flex' gutter={8} align="center">
                                <img key={"logoImg"} src={logo} align="center" className="App-logo" alt="logo" />
                            </Row>
                        </Header>
                        <Content key={"mainPageContent"} style={{ padding: '0 20px 20px 10px', background: '#fff' }}>
                            {this.state.rows}
                        </Content>
                        {this.state.footer}
                    </Layout>
                )} />
                {this.state.routes}
            </div>
        );
    }
}

export default MainPage;
