import { createGlobalStyle } from "styled-components";
import whiteny from './fonts/whitney/whitneymedium.otf'
import whitenySemibold from './fonts/whitney/whitneysemibold.otf'
import whitenyBold from './fonts/whitney/whitneybold.otf'

export const GlobalStyle = createGlobalStyle`

    :root{
        --main:#5865F2;
        --dark:#202225;
        --semi-dark:#40444b;
        --light:#dcddde;
        --lg:32px;
        --md:24px;
        --sm:16px;
        --xs:12px;
    }
    * {
        font-family:main;
        margin:0;
        padding:0;
    }

    body{
        background-color:var(--dark);
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

@font-face {
    font-family: 'main-semibold';
    src: url(${whitenySemibold}) format('woff2'),
  }

@font-face {
    font-family: 'main-bold';
    src: url(${whitenyBold}) format('woff2'),
  }
`;

