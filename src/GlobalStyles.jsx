import { createGlobalStyle } from "styled-components";
import whiteny from './fonts/whitney/whitneybook.otf'

export const GlobalStyle = createGlobalStyle`
    * {
        font-family:main;
        margin:0;
        padding:0;
    }

    .error{
        margin-top:0.5rem;
        color:#fff;
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

export const FontStyles = createGlobalStyle`

@font-face {
  font-family: 'main';
  src: url(${whiteny}) format('woff2'),
}
`;

