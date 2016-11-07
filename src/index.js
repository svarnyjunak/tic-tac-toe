import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import Game from "../src/components/game"
import { createStore } from "redux"
import game from "./reducers/gameReducer"
import { resetGame } from "./actions/gameActions"

let store = createStore(game)
console.log(store.getState())

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch(resetGame())

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('container')
);
