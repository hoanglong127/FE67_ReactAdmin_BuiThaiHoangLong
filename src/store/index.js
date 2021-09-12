import thunk from "redux-thunk";
import user from "./reducers/user";
const {
  combineReducers,
  createStore,
  compose,
  applyMiddleware,
} = require("redux");

const rootReducer = combineReducers({
  user,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
