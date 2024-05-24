import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    body {
        background-color: lightgray 
    }

`;

export default GlobalStyle;
