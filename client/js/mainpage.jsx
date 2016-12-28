import React from 'react';
import {BaseData} from './basedata.jsx' ;

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
        return (
            <div>
                <Header></Header>
                <BaseData data={ this.props.data.baseData }></BaseData>
                <section className="item-list">
                    
                </section>
            </div>
        )
    }
});

export {MainPage}