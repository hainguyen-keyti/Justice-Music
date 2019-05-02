import { applyMiddleware, createStore, compose } from "redux";
import { createLogger } from "redux-logger"
import thunk from 'redux-thunk'
import rootReducer from './reducers'

let logger = createLogger({
    timestamps: true,
    duration: true
});
const store = createStore(rootReducer, compose(applyMiddleware(logger, thunk)));

export default store;