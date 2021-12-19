import './index.css'

const StateProfile = props => {
  const {statesDetails, updateSearchInput} = props
  const {stateCode, stateName} = statesDetails

  const onClickSuggestion = () => {
    updateSearchInput(stateCode)
  }

  return (
    <li className="state-container">
      <button className="container" type="button" onClick={onClickSuggestion}>
        <p className="state">{stateName}</p>
        <div className="code-container">
          <p className="code">{stateCode}</p>
          <div className="img-container">
            <img
              src="https://res.cloudinary.com/drnjmmqvg/image/upload/v1639650026/Shape_dk4zae.png"
              className="img"
              alt="img"
            />
          </div>
        </div>
      </button>
    </li>
  )
}

export default StateProfile
