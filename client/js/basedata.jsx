import React from 'react';

var BaseData = React.createClass({
    shouldComponentUpdate: function (nextProps, nextState) {
        return true;
    },
    render: function () {
        var data = this.props.data.fields ;
        return (
            <section>
                {this.props.data.request}
                { data ? 
                (<article>
                    <p>{data.name}</p>
                    <p>{data.bio}</p>
                    <p>Public repositories: {data.public_repos}</p>
                </article>) : null
                }   
            </section>
        )
    }
});



export { BaseData }