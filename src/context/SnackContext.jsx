import React, { createContext, useReducer } from "react";

export const SnackContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "show":
            return {
                show: true,
                content: action.content,
                snackType: action.snackType,
            };
        case "hide":
            return { ...state, show: false };
    }
};

export default function SnackContextProvider({ children }) {
    const [snackData, dispatch] = useReducer(reducer, {
        show: false,
        content: "",
        snackType: "",
    });

    const showSnack = (content, type) => {
        dispatch({ type: "show", content: content, snackType: type });
    };
    const hideSnack = () => {
        dispatch({ type: "hide" });
    };

    return (
        <SnackContext.Provider value={{ snackData, showSnack, hideSnack }}>
            {children}
        </SnackContext.Provider>
    );
}
