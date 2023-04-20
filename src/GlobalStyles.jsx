import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    * {
        font-family: sans-serif;
        margin:0;
        padding:0;
    }

    .error{
        margin-top:0.5rem;
        color:#f00;
    }

    button{
        all: unset;
    }

    i{
        &:hover{
            cursor:pointer;
        }
    }
    `;
