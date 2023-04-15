import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap-icons/font/bootstrap-icons.css";
import AuthContextProvider from "./context/AuthContext";
import SnackContextProvider from "context/SnackContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthContextProvider>
            <SnackContextProvider>
                <App />
            </SnackContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);
