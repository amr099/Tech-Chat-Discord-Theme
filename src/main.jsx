import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "index.css";
import AuthContextProvider from "./context/AuthContext";
import RoomContextProvider from "./context/RoomContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import UsersContextProvider from "context/UsersContext";
import RoomsContextProvider from "context/RoomsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <UsersContextProvider>
            <RoomContextProvider>
                <RoomsContextProvider>
                    <AuthContextProvider>
                        <App />
                    </AuthContextProvider>
                </RoomsContextProvider>
            </RoomContextProvider>
        </UsersContextProvider>
    </React.StrictMode>
);
