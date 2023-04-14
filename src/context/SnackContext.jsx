import React, { createContext, useState } from "react";

export const SnackContext = createContext();

export default function SnackContextProvider({ children }) {
    const [show, setShow] = useState(false);
    const [content, setContent] = useState("");
    const [type, setType] = useState("");

    return (
        <SnackContext.Provider
            value={{ show, setShow, content, setContent, type, setType }}
        >
            {children}
        </SnackContext.Provider>
    );
}
