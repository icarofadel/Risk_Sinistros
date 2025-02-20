import { Container } from './styles'

const currentYear = new Date().getFullYear()

const Footer = () => (
  <Container>
    <div className="container">
      <p>
        Copyright &copy; {currentYear} - <span>Icaro Natã Fadel </span>Todos os
        direitos reservados
      </p>
    </div>
  </Container>
)

export default Footer
