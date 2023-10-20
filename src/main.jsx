import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthContextProvider from "./context/AuthContext";
import SnackContextProvider from "./context/SnackContext";
import {FontStyles} from "./GlobalStyles";
import "bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthContextProvider>
            <SnackContextProvider>
            <FontStyles />
                <App />
            </SnackContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);
