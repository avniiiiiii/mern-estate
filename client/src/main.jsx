import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux"; //component from the React-Redux library that makes the Redux store available to your entire React application
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
