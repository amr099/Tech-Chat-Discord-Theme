import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "index.css";
import AuthContextProvider from "./AuthContext";
import RoomContextProvider from "./RoomContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RoomContextProvider>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </RoomContextProvider>
    </React.StrictMode>
);
