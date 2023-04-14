import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap-icons/font/bootstrap-icons.css";
import AuthContextProvider from "./context/AuthContext";
import RoomContextProvider from "./context/RoomContext";
import UsersContextProvider from "./context/UsersContext";
import SnackContextProvider from "context/SnackContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <SnackContextProvider>
            <UsersContextProvider>
                <RoomContextProvider>
                    <AuthContextProvider>
                        <App />
                    </AuthContextProvider>
                </RoomContextProvider>
            </UsersContextProvider>
        </SnackContextProvider>
    </React.StrictMode>
);
