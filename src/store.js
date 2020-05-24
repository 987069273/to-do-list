import { createStore } from 'redux';
import reducer from  './reducers/index';

const store = createStore(reducer);

// store.subscribe();

export default store;


