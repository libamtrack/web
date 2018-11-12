import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import getConfigurationFromJSON from "../../providers/ConfigProvider";
import logo from "../../static/img/logo.png";

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
            <div>
                <Link to={"/"}>
                    <img style={{width: 185, height: 185}} src={logo} align="center" className="App-logo" alt="logo" />
                </Link>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[this.props.selectedKey]}
                    defaultOpenKeys={[this.props.openKey]}
                    style={{ height: '100%', borderRight: 0 }}>
                    {this.state.subMenus}
                </Menu>
            </div>
        );
    }
}

export default SideMenu;