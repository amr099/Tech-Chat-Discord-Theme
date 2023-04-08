import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap-icons/font/bootstrap-icons.css";
import AuthContextProvider from "./context/AuthContext";
import RoomContextProvider from "./context/RoomContext";
import UsersContextProvider from "./context/UsersContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <UsersContextProvider>
            <RoomContextProvider>
                <AuthContextProvider>
                    <App />
                </AuthContextProvider>
            </RoomContextProvider>
        </UsersContextProvider>
    </React.StrictMode>
);
