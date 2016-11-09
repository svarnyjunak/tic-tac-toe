import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"
import Game from "../src/components/game"
import game from "./reducers/gameReducer"
import { resetGame } from "./actions/gameActions"

const store = createStore(game)
console.log(store.getState())

store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch(resetGame());

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById("container")
);
