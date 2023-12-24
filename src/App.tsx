import React from "react";
import "./App.css";
import SearchBar from "./components/searchBar/SearchBar";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <Provider store={store}>
      <div className="App-Body">
        <SearchBar />
      </div>
    </Provider>
  );
}

export default App;
