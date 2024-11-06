import { Link } from "react-router-dom";

import './Navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
      <div id="logo">LOGO</div>
      <div className="links">
        <Link to='/'>Início</Link>
        <Link to='/transactions'>Transações</Link>
        <Link to='/category'>Categorias</Link>
      </div>
    </div>
  )
}

export default Navbar