import React from 'react';
import { store } from './store.js';

var ListWrapper = React.createClass({
    shouldComponentUpdate: function (nextProps, nextState) {
        return true;
    },
    render: function () {
        var content = null;
        if (this.props.data) {
            if (this.props.data.request == 'done') {
                content = React.createElement(List, { data: this.props.data });
            }
            else {
                content = React.createElement('div', { className: 'ajax' }, this.props.data.request == 'fetch' ? 'Loading data...' : 'Network error. '+ this.props.data.error );
            }
        }
        return (
            <section className="item-list">
                {content}
            </section>
        )
    }
});

var List = React.createClass({
    shouldComponentUpdate: function (nextProps, nextState) {
        return true;
    },
    render: function () {
        return (
            <div>

                {this.props.data.data.map((item, idx) => {
                    return (
                        <article key={idx}>
                            <a href={item.html_url} target='_blank'> {item.name} </a> ( {(new Date(item.updated_at)).toLocaleDateString()} )
                        </article>
                    )
                })
                }
            </div>
        )
    }
});

var ListItem = React.createClass({
    shouldComponentUpdate: function (nextProps, nextState) {
        return true;
    },
    render: function () {
        return (
            <article>
                {this.props.data}
            </article>
        )
    }
});

var Pager = React.createClass({
    shouldComponentUpdate: function (nextProps, nextState) {
        return true;
    },
    change: function (dir) {
        store.actions.loadPage.call(store, store.state.currentPage + dir);
    },
    render: function () {
        var data = {
            currentPage: this.props.data.currentPage,
            pages: this.props.data.baseData.fields && Math.ceil(this.props.data.baseData.fields.public_repos / 15),
            disableRev: this.props.data.currentPage == 1
        }
        data.disableFF = data.currentPage == data.pages;
        return (
            <div className="pager">
                {data.pages ? (
                    <div>
                        <button disabled={data.disableRev} className="inline" data-role="rev" onClick={() => { this.change(-1) } }>&lt;</button>
                        <label className="inline">page {data.currentPage} of {data.pages}</label>
                        <button disabled={data.disableFF} className="inline" data-role="ff" onClick={() => { this.change(1) } }>&gt;</button>
                    </div>) : null}
            </div>
        )
    }
});

export { ListWrapper, Pager }