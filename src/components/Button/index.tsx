import { Buttons, ButtonLink } from './styles'

type Props = {
  type: 'button' | 'link' | 'submit'
  title: string
  to?: string
  onClick?: () => void
  children: string
}

const Botao = ({ type, title, to, onClick, children }: Props) => {
  if (type === 'button' || type === 'submit') {
    return (
      <Buttons type={type} title={title} onClick={onClick}>
        {children}
      </Buttons>
    )
  }

  return (
    <ButtonLink to={to as string} title={title}>
      {children}
    </ButtonLink>
  )
}

export default Botao
