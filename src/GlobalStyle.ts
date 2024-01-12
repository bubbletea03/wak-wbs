import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: ${(props) => props.theme.colors && props.theme.colors.bg};
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
`;

export default GlobalStyle;
