import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const StateProfile = props => {
  const {stateCode, stateName, id} = props

  return (
    <li className="suggestion-list">
      <Link to={`/state/${id}`}>
        <p className="state-name">{stateName}</p>
        <button type="button" className="button-container">
          <p className="state-code">{stateCode}</p>
          <BiChevronRightSquare className="button-img" />
        </button>
      </Link>
    </li>
  )
}

export default StateProfile
