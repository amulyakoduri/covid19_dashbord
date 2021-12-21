import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const {isActive} = props
  const activeText = isActive ? 'active-text' : ''

  const onClickOptions = () => (
    <ul>
      <li>Home</li>
      <li>About</li>
    </ul>
  )

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
      <div className="mobile-nav-container">
        <Link to="/">
          <h1 className="logo-mobile-text">
            COVID19<span className="india-text">INDIA</span>
          </h1>
          <button type="button" onClick={onClickOptions}>
            <img
              src="https://res.cloudinary.com/drnjmmqvg/image/upload/v1640070790/add-to-queue_1_yprekp.png"
              className="options-img"
              alt="options img"
            />
          </button>
        </Link>
      </div>
    </nav>
  )
}

export default withRouter(Header)
