import styled from 'styled-components'
import { breakponints, cores } from '../../styles'

export const HeaderBar = styled.header`
  background-color: #000;
  color: ${cores.color};
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1024px;
    width: 100%;
    padding: 0 16px;
  }

  img {
    width: 180px;
    height: 100%;
    margin: 0 8px;
  }

  h1 {
    font-size: 24px;

    @media (max-width: ${breakponints.tablet}) {
      display: none;
    }
  }
`
