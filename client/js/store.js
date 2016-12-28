'use strict'

import 'lodash';
import { toTime } from './helpers.js';

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
    state: { modalRef: {} },
    initialState: {
        baseData: {
            request: 'idle'
        }
    },
    setValue: function (ref, value) {
        _.set(this.state, ref, value);
        store.renderRef.forceUpdate.call(store.renderRef);
    },

    actions: {
        getBaseData: function () {
            this.setValue('baseData.request', 'fetch');

            fetch('https://api.github.com/users/addyosmani', {
                headers: new Headers({})
            }).then(response => {

                if (response.status >= 200 && response.status < 300) {
                    return Promise.resolve(response)
                } else {
                    return Promise.reject(new Error(response.statusText))
                }

            }).then(response => {
                return response.json();
            }).then(responseData => {
                this.setValue('baseData.request', 'done');
                this.setValue('baseData.fields',responseData);
                console.log(responseData);
            })
            .catch(err => {
                this.setValue('baseData.request', 'error');
                console.error(err);
            })
        }
        // counter: {
        //     up: function () {
        //         this.setValue('counter.cnt', this.state.counter.cnt + 1);
        //     },
        //     down: function () {
        //         console.info(this);
        //         this.state.counter.cnt--;
        //     }
        // }



    }
}



export { store };