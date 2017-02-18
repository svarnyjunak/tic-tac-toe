import React from "react" // eslint-disable-line no-unused-vars
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import { Router, Route, browserHistory } from 'react-router'
import App from "./components/app"
import reducer from "./reducers/gameReducer"
import actionCreators from "./actions/gameActionCreators"
import startListening, { socketMiddleware } from "./middlewares/socketMiddleware"

const createStoreWithMiddleware = applyMiddleware(socketMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ &&
                                                 window.__REDUX_DEVTOOLS_EXTENSION__());

store.dispatch(actionCreators.resetGame());
startListening(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
    </Router>  
  </Provider>,
  document.getElementById("container")
);

