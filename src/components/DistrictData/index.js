import './index.css'

const DistrictData = props => {
  const {number, name} = props

  return (
    <li className="list-style">
      <p className="district-value">{number}</p>
      <p className="district-name">{name}</p>
    </li>
  )
}

export default DistrictData
