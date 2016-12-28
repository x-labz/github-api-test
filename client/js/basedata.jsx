import React from 'react';

var BaseData = React.createClass({
    shouldComponentUpdate: function (nextProps, nextState) {
        return true;
    },
    render: function () {
        var data = this.props.data.fields ;
        var msg = (this.props.data.request == 'fetch' ? 'Loading data...' : 'Network error.'  ) ;
        return (
            <section>
            <h3>Basedata: </h3>
                { !!data ? 
                (<article>
                    <p><b>{data.name}</b></p>
                    <p>{data.bio}</p>
                    <p>Public repositories: {data.public_repos}</p>
                </article>) : (<div>{msg}</div>)
                }   
            </section>   
        )
    }
});



export { BaseData }