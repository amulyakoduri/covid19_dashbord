import './index.css'

const StateProfile = props => {
  const {statesDetails, updateSearchInput} = props
  const {stateCode, stateName} = statesDetails

  const onClickSuggestion = () => {
    updateSearchInput(stateCode)
  }

  return (
    <li className="suggestion-list">
      <p className="state-name">{stateName}</p>
      <button
        type="button"
        onClick={onClickSuggestion}
        className="button-container"
      >
        <p className="state-code">{stateCode}</p>
        <img
          src="https://res.cloudinary.com/drnjmmqvg/image/upload/v1640018348/Line_lwzjio.png"
          className="button-img"
          alt="button img"
        />
      </button>
    </li>
  )
}

export default StateProfile
