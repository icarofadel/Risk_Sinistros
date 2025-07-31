import styled from 'styled-components'
import { breakponints, cores } from '../../styles'

export const HomeSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;

  h2,
  h3 {
    color: ${cores.color};
    padding: 8px;
    display: flex;
    justify-content: center;
  }
`

export const ControlButtons = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const ContainerButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: ${breakponints.tablet}) {
    grid-template-columns: 1fr;
  }
`

export const Column = styled.div`
  text-align: center;
`

export const ContainerRelatorio = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 16px;

  div {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
    width: 100%;
  }

  button {
    min-width: 180px;
    padding: 16px;

    @media (max-width: ${breakponints.tablet}) {
      flex: 1 1 100%;
      max-width: 100%;
    }
  }
`
