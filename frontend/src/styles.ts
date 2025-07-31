import { createGlobalStyle } from 'styled-components'
import StarRisk from './assets/image/STAR-RISK.png'

export const cores = {
  white: '#fff',
  color: 'rgba(40, 168, 225)'
}

export const breakponints = {
  desktop: '1024px',
  tablet: '768px'
}

export const GlobalCss = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    list-style: none;
  }

  .fundo{
    background-color: #3c3c3c;
    background-image: url(${StarRisk});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
  }

  .container {
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
  }
`
