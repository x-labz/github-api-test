import _ from 'lodash' ;

var store = {
    initialize: function () {
        this.state = Object.assign({}, this.initialState);
    },
    bind: function (arg) {
        this.renderRef = arg.mainpage;
    }, 
    getInitialState: function () {
        return this.initialState;
    },
    state: { },
    initialState: {
        baseData: {
            request: 'idle'
        },
        currentPage: 1,
        repos: {}
    },
    setValue: function (ref, value) {
        _.set(this.state, ref, value);
        store.renderRef && store.renderRef.forceUpdate.call(store.renderRef);
    },

    actions: {
        getBaseData: function (callback) {
            this.setValue('baseData.request', 'fetch');

            fetch('https://api.github.com/users/addyosmani', {
                headers: new Headers({})
            }).then(response => {

                if (response.status >= 200 && response.status < 300) {
                    return Promise.resolve(response)
                } else {
                    return Promise.reject(response)
                }
            }).then(response => {
                return response.json();
            }).then(responseData => {
                this.setValue('baseData.request', 'done');
                this.setValue('baseData.fields', responseData);
                // console.log(responseData);
                callback && callback();
            }).catch(err => {
                this.setValue('baseData.request', 'error');

                this.setValue('baseData.error', err.status + '(' + err.statusText + ')' );

                console.error(err);
            })
        },
        loadPage: function (page, callback) {
            this.setValue('currentPage', page);

            if (!this.state.repos[page] || (this.state.repos[page] && this.state.repos[page].request == 'error')) {
                this.setValue('repos[' + page + ']', {
                    request: 'fetch',
                    data: []
                });
                fetch('https://api.github.com/users/addyosmani/repos?page=' + page + '&per_page=15', {
                    headers: new Headers({})
                }).then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        return Promise.resolve(response)
                    } else {
                        return Promise.reject(response)
                    }
                }).then(response => {
                    return response.json();
                }).then(responseData => {
                    this.setValue('repos[' + page + '].request', 'done');
                    this.setValue('repos[' + page + '].data', responseData);
                    // console.log(this.state);
                    callback && callback();
                })
                    .catch((err) => {
                        this.setValue('repos[' + page + '].request', 'error');

                        this.setValue('repos[' + page + '].error', err.status + ' ( ' + err.statusText + ' )');

                        console.error(err);
                    })
            }
        }
    }
}



export { store };