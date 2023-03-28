import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "index.css";
import AuthContextProvider from "./context/AuthContext";
import RoomContextProvider from "./context/RoomContext";
import "bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RoomContextProvider>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </RoomContextProvider>
    </React.StrictMode>
);
