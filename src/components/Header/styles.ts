import styled from 'styled-components'
import { cores } from '../../styles'

export const HeaderBar = styled.header`
  background-color: #000;
  color: ${cores.color};
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
  }

  img {
    width: 180px;
    height: 100%;
    margin: 0 8px;
  }
`
