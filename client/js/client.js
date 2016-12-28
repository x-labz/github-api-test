'use strict'

import React from 'react'; 
import ReactDOM from 'react-dom';
import {store} from './store.js';
import {MainPage} from './mainpage.jsx'

console.info("start");

store.initialize();
var _page = ReactDOM.render(React.createElement(MainPage, { data: store.state }), document.querySelector("[data-role='page']"));

store.bind({
	mainpage: _page
});

store.actions.getBaseData.call(store); 
store.actions.loadPage.call(store,store.state.currentPage) ;  

