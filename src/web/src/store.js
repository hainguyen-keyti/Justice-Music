import { applyMiddleware, createStore, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from "redux-logger"
import thunk from 'redux-thunk'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './reducers'; // giá trị trả về từ combineReducers

const logger = createLogger({
    timestamps: true,
    duration: true
});

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['userReducer'],
    stateReconciler: autoMergeLevel2 // Xem thêm tại mục "Quá trình merge".
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, compose(applyMiddleware(logger, thunk)));
export const persistor = persistStore(store);

