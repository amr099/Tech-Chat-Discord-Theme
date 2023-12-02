import { createGlobalStyle } from "styled-components";
import whiteny from "./assets/fonts/whitney/whitneymedium.otf";
import whitenySemibold from "./assets/fonts/whitney/whitneysemibold.otf";
import whitenyBold from "./assets/fonts/whitney/whitneybold.otf";

export const GlobalStyle = createGlobalStyle`

    :root{
        --main:#5865F2;
        --dark:#202225;
        --semi-dark:#40444b;
        --light:#dcddde;
        --green:#2d7d76;
        --lg:2rem;
        --md:1.5rem;
        --sm:1rem;
        --xs:0.75rem;
    }
    * {
        font-family:main;
        margin:0;
        padding:0;
        box-sizing:border-box;
    }

    ::-webkit-scrollbar {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	    background-color: var(--semi-dark);
	    border-radius: 9px;
    }

    ::-webkit-scrollbar-thumb{
        background-color: var(--main);
        border: 3px solid transparent;
        border-radius: 9px;
        background-clip: content-box;
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
    @media (max-width:992px){
        h1{
            font-size:1.75rem !important;
        }
        h2{
            font-size:1.25rem !important;
        }
        h3{
            font-size: 1rem !important;
        }
        p,input,button,span{
            font-size: 0.75rem !important;
        }
    }

    @media (max-width:768px){
        h1{
            font-size:1.5rem !important;
        }
        h2{
            font-size:1rem !important;
        }
        h3{
            font-size: 0.75rem !important;
        }
        p,input,button,span{
            font-size: 0.6rem !important;
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
