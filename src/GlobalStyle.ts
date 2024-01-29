import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SUITE-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
  }


  body {
    margin: 0;
    font-family: 'SUITE-Regular', "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
      "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${(props) => props.theme.colors.bg};
    color: ${(props) => props.theme.colors.text}
  }

  button {
    cursor: pointer;
    border: 0;
    background-color: transparent;
  }

  img {
    opacity: 1;
    transition: background-color 1s;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
