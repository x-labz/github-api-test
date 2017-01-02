import test from 'tape';
import { store } from '../client/js/store.js';

require('es6-promise').polyfill();
require('isomorphic-fetch');

store.initialize();

test('store init', (assert) => {
  assert.equal(store.state.currentPage, 1);
  assert.end();
});

test('store set value', (assert) => {
  store.setValue.call(store, 'currentPage', 2);
  assert.equal(store.state.currentPage, 2);
  assert.end();
});

test('get base data', (assert) => {
  assert.timeoutAfter(1000);
  store.actions.getBaseData.call(store, function () {
    assert.notEqual(store.state.baseData.fields, undefined);
    assert.end();
  });
});

test('get first page', (assert) => {
  assert.timeoutAfter(1000);
  store.actions.loadPage.call(store, 1, function () {
    assert.notEqual(store.state.repos["1"], undefined);
    assert.end();
  })
});