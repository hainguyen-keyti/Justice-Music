import { combineReducers } from "redux";
import {userReducer} from "./user"
import {chatReducer} from "./chat"
import {appReducer} from "./app"

const systemReducer = combineReducers({
    userReducer,
    chatReducer,
    appReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }

  return systemReducer(state, action);
};

export default rootReducer;