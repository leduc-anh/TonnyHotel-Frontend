
import { combineReducers } from 'redux';
// import các reducer khác nếu có
import userReducer from "./useReducer";
const rootReducer = combineReducers({
    user: userReducer
});

export default rootReducer
export { rootReducer };