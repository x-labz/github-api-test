import React from 'react';
import { BaseData } from './basedata.jsx';
import { ListWrapper, Pager } from './list.jsx';

var Header = React.createClass({
    shouldComponentUpdate: function (nextProps, nextState) {
        return true;
    },
    render: function () {
        return (
            <header>
                <div className="row">
                    <h1 className='title'>
                        github api test
                    </h1>
                </div>  
            </header>
        )
    }

});

var MainPage = React.createClass({
    getInitialState: function () {
        return {

        }
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        return true;
    },
    render: function () {
        var repo = this.props.data.repos[this.props.data.currentPage];
        return (
            <div>
                <Header></Header>
                <BaseData data={this.props.data.baseData}></BaseData>
                <section>
                    <h3>Repositories: </h3>
                    <Pager data={this.props.data}></Pager>
                    <ListWrapper  data={repo}></ListWrapper>
                    <Pager data={this.props.data}></Pager>
                </section>
            </div>
        )
    }
});

export { MainPage }