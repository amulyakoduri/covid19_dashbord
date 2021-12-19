import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const {isActive} = props
  const activeText = isActive ? 'active-text' : ''
  return (
    <nav>
      <div className="nav-container">
        <Link to="/">
          <h1 className="logo-text">
            COVID19<span className="india-text">INDIA</span>
          </h1>
        </Link>
        <ul>
          <Link to="/">
            <h1 className={`home-text ${activeText}`}>Home</h1>
          </Link>
          <Link to="/about">
            <h1 className={`about-text ${activeText}`}>About</h1>
          </Link>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
