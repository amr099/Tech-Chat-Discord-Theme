import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    * {
        font-family: sans-serif;
    }

    body{
        margin:0;
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
