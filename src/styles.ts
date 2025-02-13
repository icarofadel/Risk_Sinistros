import { createGlobalStyle } from 'styled-components'

export const cores = {
  white: '#fff',
  color: 'rgba(40, 168, 225)'
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

  .container {
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
  }
`
