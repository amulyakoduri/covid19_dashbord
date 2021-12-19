import {VscGithubAlt} from 'react-icons/vsc'

import {FiInstagram} from 'react-icons/fi'

import {FaTwitter} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <h1 className="footer-heading">
      COVID19<span className="india-text">INDIA</span>
    </h1>
    <p className="footer-paragraph">
      we stand with everyone fighting on the front lines
    </p>
    <div className="icon-container">
      <VscGithubAlt className="git" />
      <FiInstagram className="instagram" />
      <FaTwitter className="twitter" />
    </div>
  </div>
)

export default Footer
