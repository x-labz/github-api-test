
import { store } from '../client/js/store.js';

store.initialize();

test('store init', () => {
    expect(store.state.currentPage).toBe(1);
});

test('store set value', () => {
    store.setValue.call(store,'currentPage',2) ;
    expect(store.state.currentPage).toBe(2);
});