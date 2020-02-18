import React from "react";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import Main from "./component/Main";

function App() {
  return (
    <div className="App">
      <Provider store={configureStore()}>
        <Main />
      </Provider>
    </div>
  );
}

export default App;
