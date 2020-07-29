import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import fileReducer from './filesDucks';
import categoriesReducer from './categoriesDuck';
import userReducer from './usersDuck';

const rootReducer = combineReducers({
    files: fileReducer,
    categories: categoriesReducer,
    user: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const Store = createStore(rootReducer, composeEnhancers( applyMiddleware(thunk) ) );
    return Store;
}