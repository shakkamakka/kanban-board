import {Link} from 'react-router-dom';

const Nav = () => {
  return (
    <nav className='nav'>
      <div className='nav-logo'></div>
      <Link to="/">Dashboard</Link>
    </nav>
  )
}

export default Nav