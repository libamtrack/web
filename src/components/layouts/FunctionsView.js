import React from 'react';
import {Layout} from 'antd';
import SideMenu from "./SideMenu.js";
import FunctionsController from '../functions/FunctionsController.js';

const { Content, Sider } = Layout;

const FunctionsView = (props) => {
    return (
        <Layout>
            <Layout>
                <SideMenu selectedKey={props.selectedKey}
                    openKey={props.openKey}
                    allFunctions={props.allFunctions}
                />
                <Layout style={{ padding: '0 2px 2px' }}>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        <FunctionsController jsonPath={props.jsonPath} dictionaryData={props.dictionaryData} />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default FunctionsView;