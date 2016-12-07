import React from "react" // eslint-disable-line no-unused-vars
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"
import io from "socket.io-client"
import App from "../src/components/app"
import reducer from "./reducers/gameReducer"
import actionCreators from "./actions/gameActionCreators"

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ &&
                                   window.__REDUX_DEVTOOLS_EXTENSION__());

store.dispatch(actionCreators.resetGame());

const socket = io("localhost:4000");

ReactDOM.render(
  <Provider store={store}>
    <App socket={ socket } />
  </Provider>,
  document.getElementById("container")
);

