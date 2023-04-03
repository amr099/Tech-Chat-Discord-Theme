import React from "react";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    html{
        max-height:80vh;
    }
    

    body{
        margin:0;
        font-family:sans-serif;
        height:80vh;
    }

    h2{
        margin:0;
    }

    button{
        all: unset;
    }

    i{
        font-size:1rem;
        &:hover{
            cursor:pointer;
        }
    }

    

    ::placeholder{
        color:#CFCFCF;
    }

    .bi-plus
    {
        &:hover{
        background-color:#292929;
        color:#fff;
        border-radius:5px;
}
    `;
