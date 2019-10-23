import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux-immutable'
import loginReducer from './loginReducer'


const appReducer = combineReducers({
    login: loginReducer
})

const store = createStore(appReducer, applyMiddleware(thunk));
export default store;