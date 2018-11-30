import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { AutoComplete, Button, Icon, Input } from 'antd';

export default class SearchBox extends React.Component {
    state = {
        searchFuns: this.props.searchFuns
    }
    
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
    }

    onSelect(option) {
        return <Redirect to={option} />
    }

    handleSearch = (value) => {
        let result = this.state.funs.filter(o => o.fun.name.toLowerCase().includes(value.toLowerCase()));
        this.setState({ searchFuns: result });
    };

    render() {
        return (
            <AutoComplete
                className="global-search"
                size="large"
                style={{ width: '70%' }}
                dataSource={this.state.searchFuns.map(this.renderOption)}
                onSelect={this.onSelect}
                filterOption={(inputValue, option) =>
                    option.props.text.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                placeholder="function name"
                optionLabelProp="text">
                <Input
                    suffix={(
                        <Button className="search-btn" size="large" style={this.props.searchStyle}>
                            <Icon type="search" />
                        </Button>
                    )}
                />
            </AutoComplete>
        );
    }
}