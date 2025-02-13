import { createGlobalStyle } from 'styled-components'

export const cores = {
  fundo: '#808080',
  cinza1: '#202020',
  black: '#000',
  text: '#ffffff',
  red: '#FF0000',
  cardP: '#D9D9D9'
}

export const breakponints = {
  desktop: '1024px',
  tablet: '768px'
}

export const GlobalCss = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    list-style: none;
  }

  body {
    background-color: ${cores.fundo};
    background-image: linear-gradient(50deg, ${cores.fundo}, ${cores.cinza1});
    color: ${cores.text};
  }

  html {
    scroll-behavior: smooth;
  }

  .container {
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
  }
`
