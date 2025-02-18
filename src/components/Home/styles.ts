import styled from 'styled-components'
import { cores } from '../../styles'

export const HomeSection = styled.section`
  h2 {
    color: ${cores.color};
    padding: 8px;
    display: flex;
    justify-content: center;
  }
`

export const ControlButtons = styled.div`
  margin-top: 8px;
  display: grid;
  justify-items: start;
`

export const Buttons = styled.button`
  background-color: ${cores.color};
  color: ${cores.white};
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  margin: 16px;
  border-radius: 16px;
  cursor: pointer;
`
