import {Link} from 'react-router-dom'
import './index.css'

const TotalStates = props => {
  const {stateCases} = props
  const {
    stateName,
    confirmed,
    recovered,
    deceased,
    population,
    other,
    stateCode,
  } = stateCases

  const active = confirmed - recovered - deceased - other

  return (
    <li className="list-all-cases">
      <div className="states-container-home">
        <Link to={`/state/${stateCode}`} className="link-home">
          <p className="state-names-home">{stateName}</p>
        </Link>
      </div>
      <div className="home-columns">
        <p className="confirmed-home">{confirmed}</p>
      </div>
      <div className="home-columns">
        <p className="active-home">{active}</p>
      </div>
      <div className="home-columns">
        <p className="recovered-home">{recovered}</p>
      </div>
      <div className="home-columns">
        <p className="deceased-home">{deceased}</p>
      </div>
      <div className="home-columns">
        <p className="population-home">{population}</p>
      </div>
    </li>
  )
}

export default TotalStates
