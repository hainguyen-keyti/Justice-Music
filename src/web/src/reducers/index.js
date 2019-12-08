import { combineReducers } from "redux";
import {userReducer} from "./user"
import {chatReducer} from "./chat"
import {appReducer} from "./app"
import {pageReducer} from "./page"
import {songReducer} from "./song"

const systemReducer = combineReducers({
    userReducer,
    chatReducer,
    appReducer,
    pageReducer,
    songReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }

  return systemReducer(state, action);
};

export default rootReducer;