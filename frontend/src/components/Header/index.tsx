import * as S from './styles'
import logo from '../../assets/image/JALIM-RABEI.png'
import risk from '../../assets/image/Logo.png'

const Header = () => (
  <S.HeaderBar>
    <img src={logo} alt="Jalim Sistemas logo" />
    <h1>Jalim Sistemas</h1>
    <img src={risk} alt="Servicos logo" />
  </S.HeaderBar>
)

export default Header
