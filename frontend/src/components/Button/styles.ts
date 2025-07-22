import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { cores } from '../../styles'

export const Buttons = styled.button`
  background-color: ${cores.color};
  color: ${cores.white};
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  margin: 16px;
  border-radius: 16px;
  cursor: pointer;
  border: none;

  &.botaoFechar {
    background-color: red;
  }
`
export const ButtonLink = styled(Link)`
  background-color: ${cores.color};
  color: ${cores.white};
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  margin: 16px;
  border-radius: 16px;
  text-decoration: none;
  text-align: center;
  border: none;

  &.botaoFechar {
    background-color: red;
  }
`
