import React from "react";
import { Provider } from "react-redux";
import store from "./Redux/store";
import AllRouter from "./Router";

function App() {
    return (
        <Provider store={store}>
            <AllRouter />
        </Provider>
    );
}

export default App;
