import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
        <h1 className="text-4xl font-bold text-red-500">Hello Tailwindsssss</h1>

    </Provider>
  </React.StrictMode>
);
