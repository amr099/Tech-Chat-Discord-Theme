import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthContextProvider from "./context/AuthContext";
import SnackContextProvider from "./context/SnackContext";
import { FontStyles } from "./GlobalStyles";
import "bootstrap-icons/font/bootstrap-icons.css";
import UsersContextProvider from "./context/UsersContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <UsersContextProvider>
            <AuthContextProvider>
                <SnackContextProvider>
                    <FontStyles />
                    <App />
                </SnackContextProvider>
            </AuthContextProvider>
        </UsersContextProvider>
    </React.StrictMode>
);
