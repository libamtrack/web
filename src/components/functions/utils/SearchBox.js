import React from "react";
import {Link, Redirect} from 'react-router-dom';
import {AutoComplete, Button, Icon, Input} from 'antd';

export default class SearchBox extends React.Component {
    state = {
        searchFuns: this.props.searchFuns
    };

    renderOption = (item) => {
        const Option = AutoComplete.Option;
        const path = '/' + item.cat.name.replace(/ /g, '') + '/' + item.fun.name.replace(/ /g, '');
        return (
            <Option key={path} text={item.fun.name}>
                <Link
                    to={path}
                    style={item.cat.functionsStyle}>
                    {item.fun.name}
                </Link>
            </Option>
        );
    };

    onSelect(option) {
        return <Redirect to={option} />
    }

    render() {
        const size = this.props.searchStyle ? "large" : "small";
        const buttonStyle = this.props.searchStyle ? this.props.searchStyle : { width: "140%" };
        const inputStyle = this.props.searchStyle ? { width: '70%' } : {}
        return (
            <AutoComplete
                className="global-search"
                size={size}
                style={inputStyle}
                dataSource={this.state.searchFuns.map(this.renderOption)}
                onSelect={this.onSelect}
                filterOption={(inputValue, option) =>
                    option.props.text.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                placeholder="Search functions"
                optionLabelProp="text"
            >
                <Input
                    suffix={(
                        <Button className="search-btn" size={size} style={buttonStyle} type="primary">
                            <Icon type="search" />
                        </Button>
                    )}
                />
            </AutoComplete>
        );
    }
}