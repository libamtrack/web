import React from "react";
import getConfigurationFromJSON from "../../providers/ConfigProvider";
import {Link, Route} from 'react-router-dom';
import {Col, Layout, Row} from 'antd';
import logo from '../../static/img/logo.png'
import FunctionsView from '../layouts/FunctionsView.js';
import {ListGroup, ListGroupItem} from "react-bootstrap";

const { Header, Content, Footer } = Layout;

class MainPage extends React.Component {
    state = {
        applicationTile: "",
        introText: "",
        footerText: "",
        categories: [],
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
                    <Route key={fun.name + "RouteKey"} path={'/' + category.name.replace(/ /g, '') + '/' + fun.name.replace(/ /g, '')} render={() =>
                        <FunctionsView
                            openKey={category.name.replace(/ /g, '')}
                            selectedKey={category.name.replace(/ /g, '') + fun.name.replace(/ /g, '')}
                            jsonPath={'static/json/' + fun.jsonConfigPath}
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
    }

    componentDidMount() {
        this._asyncRequest = getConfigurationFromJSON('static/json/GlobalConfig.json')
            .then(
                confData => {
                    this.state.applicationTile = confData.applicationTile;
                    this.state.categories = confData.categories;
                    this.state.introText = confData.introText;
                    this.state.footerText = confData.footerText;
                    this.state.dictionariesPaths = confData.dictionaries;
                })
            .then(this.getDictionaries)
            .then(e => {

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
                            <Row key={1} type='flex' gutter={10} align="center"
                                style={{ paddingBottom: 25 }}>{this.state.introText}</Row>
                            <Row key={2} type='flex' gutter={10} align="center" style={{ paddingBottom: 25 }}>
                                {categoriesForColumns.map((colums, index) => (
                                    <Col span={6} key={index}>
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
                            </Row></div>)
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
                                <Col key={"logoCol"}>
                                    <img key={"logoImg"} src={logo} align="center" className="App-logo" alt="logo" />
                                </Col>
                            </Row>
                        </Header>
                        <Content key={"mainPageContent"} style={{ padding: '0 75px', background: '#fff' }}>
                            {this.state.rows}
                        </Content>
                        <Footer key={"footer"} style={{ textAlign: 'center', background: '#fff' }}>
                            {this.state.footerText}
                        </Footer>
                    </Layout>
                )} />
                {this.state.routes}
            </div>
        );
    }
}

export default MainPage;
