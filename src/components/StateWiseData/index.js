import {Component} from 'react'
import Loader from 'react-loader-spinner'
import StateTotalData from '../StateTotalData'
import DistrictData from '../DistrictData'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class StateWiseData extends Component {
  state = {
    isLoading: true,
    activeTab: true,
    category: 'Confirmed',
    eachStateTotalData: [],
    nameOfTheState: '',
    totalTestedData: '',
    date: '',
    stateId: '',
    dataArray: [],
    districtsNameList: [],
    eachDistrict: '',
  }

  componentDidMount() {
    this.getAllStatesData()
  }

  getAllStatesData = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const apiUrl = `https://apis.ccbp.in/covid19-state-wise-data`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    let data
    let stateName
    let stateWiseTestedData
    let updatedDate
    let eachState
    let district
    let districtsList
    if (response.ok) {
      data = await response.json()
      console.log(data)
      stateWiseTestedData = data[stateCode].total.tested
      const stateObject = statesList.filter(
        each => each.state_code === stateCode,
      )
      eachState = data[stateCode].total
      stateName = stateObject[0].state_name
      updatedDate = new Date(data[stateCode].meta.date)
      district = data[stateCode].districts
      districtsList = Object.keys(district)
      this.setState({
        isLoading: false,
        eachStateTotalData: eachState,
        nameOfTheState: stateName,
        totalTestedData: stateWiseTestedData,
        date: updatedDate,
        stateId: stateCode,
        dataArray: data,
        eachDistrict: district,
        districtsNameList: districtsList,
      })
    }
  }

  onGetCategory = categoryVal => {
    this.setState({category: categoryVal, activeTab: false})
  }

  renderCategoryWiseData = () => {
    const {category, eachDistrict, districtsNameList} = this.state
    const categoryLower = category.toLowerCase()

    const categoryData = districtsNameList.map(element => ({
      distName: element,
      value: eachDistrict[element].total[categoryLower]
        ? eachDistrict[element].total[categoryLower]
        : 0,
    }))
    categoryData.sort((a, b) => b.value - a.value)

    const activeCases = districtsNameList.map(element => ({
      distName: element,
      value:
        eachDistrict[element].total.confirmed -
        (eachDistrict[element].total.recovered +
          eachDistrict[element].total.deceased)
          ? eachDistrict[element].total.confirmed -
            (eachDistrict[element].total.recovered +
              eachDistrict[element].total.deceased)
          : 0,
    }))
    activeCases.sort((a, b) => b.value - a.value)

    const data = categoryLower === 'active' ? activeCases : categoryData

    return (
      <ul className="districts-list" testid="topDistrictsUnorderedList">
        {data.map(each => (
          <DistrictData
            key={each.distName}
            name={each.distName}
            number={each.value}
          />
        ))}
      </ul>
    )
  }

  renderStateView = () => {
    const {
      nameOfTheState,
      totalTestedData,
      date,
      eachStateTotalData,
      activeTab,
    } = this.state
    return (
      <div className="specific-state-container">
        <Header />
        <div className="state-name-container">
          <h1 className="specific-state-name">{nameOfTheState}</h1>
        </div>
        <p className="tested">Tested</p>
        <p className="test-count">{totalTestedData}</p>
        <p className="date">{`Last update on ${date}`}</p>
        <div className="country-stats">
          <StateTotalData
            eachStateTotalData={eachStateTotalData}
            onGetCategory={this.onGetCategory}
            active={activeTab}
          />
        </div>
        <div>
          <h1 className="top-districts">Top Districts</h1>
          <div>{this.renderCategoryWiseData()}</div>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="stateDetailsLoader">
      <Loader type="TailSpin" color="#0b69ff" height={50} width={50} />
    </div>
  )

  render() {
    return (
      <div>
        <p>{this.renderStateView()}</p>
      </div>
    )
  }
}

export default StateWiseData
