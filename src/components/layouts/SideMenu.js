import React from 'react';
import {Layout, Menu} from 'antd';
import {Link} from 'react-router-dom';
import getConfigurationFromJSON from "../../providers/ConfigProvider";
import SearchBox from "../functions/utils/SearchBox.js";
import logo from "../../static/img/logo.png";
import Sider from "antd/es/layout/Sider";

const { SubMenu } = Menu;

class SideMenu extends React.Component {
    state = {
        applicationTile: "",
        categories: [],
        subMenus: "",
    };

    componentDidMount() {
        this._asyncRequest = getConfigurationFromJSON('static/json/GlobalConfig.json').then(
            confData => {
                this.state.applicationTile = confData.applicationTile;
                this.state.categories = confData.categories;
            }).then(e => {
                let toRender = (
                    this.state.categories.map(category => (
                        <SubMenu key={category.name.replace(/ /g, '')} title={<span>{category.name}</span>}>
                            {category.functions.map(fun => (
                                <Menu.Item key={category.name.replace(/ /g, '') + fun.name.replace(/ /g, '')}>
                                    <Link
                                        to={'/' + category.name.replace(/ /g, '') + '/' + fun.name.replace(/ /g, '')}>{fun.name}</Link></Menu.Item>
                            ))}
                        </SubMenu>
                    ))
                );

                this.setState({ subMenus: toRender })
            });
    }

    render() {
        return (
            <Sider
                style={{background: "white"}}
                breakpoint="xl"
                collapsedWidth="0" >

                <Link to={"/"}>
                    <img style={{ width: 185, height: 185, paddingLeft: 15 }} src={logo} align="center"
                        className="App-logo" alt="logo" />
                </Link>
                <Layout style={{ marginBottom: '20px' }}>
                <SearchBox
                    searchFuns={this.props.allFunctions}
                    searchStyle={null}
                />
                </Layout>
                <Layout style={{ padding: '2px 0px 2px' }}>
                    <Menu
                        mode="vertical"
                        subMenuOpenDelay={0.1}
                        subMenuCloseDelay={0.1}
                        defaultSelectedKeys={[this.props.selectedKey]}
                        style={{ height: '100%', borderRight: 0 }}>
                        {this.state.subMenus}
                    </Menu>
                </Layout>
            </Sider>
        );
    }
}

export default SideMenu;