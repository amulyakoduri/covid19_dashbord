import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-main-container">
    <img
      src="https://res.cloudinary.com/amst/image/upload/v1639762911/notfnd_e79uve.jpg"
      alt="not-found-pic"
      className="not-found-image"
    />
    <h1 className="not-found-title">PAGE NOT FOUND</h1>
    <p className="not-found-paragraph">
      we are sorry, the page you requested could not be found
    </p>

    <div className="not-found-button-container">
      <Link to="/">
        <button type="button" className="not-found-home-button">
          <p className="not-found-button-text">Home</p>
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
