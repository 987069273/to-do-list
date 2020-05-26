import { combineReducers } from 'redux';

const initialState = {
    showTodoDrawer: false,
};

const toAdd = (state = initialState.showTodoDrawer, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            console.log('click add button')
            return true;
        default:
            return state
    }
}

const Reducers = combineReducers({
    showTodoDrawer: toAdd,
});


export default Reducers;