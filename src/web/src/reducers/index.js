import { combineReducers } from "redux";
import {signinReducer} from "../screens/login/reducers/signin"
import {signupReducer} from "../screens/login/reducers/signup"
import {findUserReducer} from "../screens/chat/reducers/findUser"
import {chatReducer} from "../screens/chat/reducers/chat"
import {pageReducer} from "../screens/page/reducers"

const appReducer = combineReducers({
    signinReducer,
    signupReducer,
    findUserReducer,
    chatReducer,
    pageReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;