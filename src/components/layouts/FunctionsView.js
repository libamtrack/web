import React from 'react';
import {Layout} from 'antd';
import SideMenu from "./SideMenu.js";
import FunctionsController from '../functions/FunctionsController.js';

const { Content } = Layout;

const FunctionsView = (props) => {
    return (
        <Layout >
            <SideMenu selectedKey={props.selectedKey}
                openKey={props.openKey}
                allFunctions={props.allFunctions}
            />
            <Layout style={{ padding: '0 2px 2px' }}>
                <Content style={{ background: '#fff', minHeight: 280 }}>
                    <FunctionsController jsonPath={props.jsonPath} dictionaryData={props.dictionaryData} />
                </Content>
                {props.footer}
            </Layout>
        </Layout>
    );
};

export default FunctionsView;