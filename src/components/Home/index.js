import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import StateProfile from '../StateProfile'
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

class Home extends Component {
  state = {searchInput: ''}

  componentDidMount() {
    this.getStates()
  }

  getStates = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    let fetchedData = null
    if (response.ok === true) {
      fetchedData = await response.json()
    }
    return fetchedData
  }

  convertObjectsDataIntoListItemsUsingForInMethod = () => {
    const resultList = []
    // getting keys of an object object
    const keyNames = Object.keys(this.getStates())

    keyNames.forEach(keyName => {
      console.log(keyNames)
      let data
      if (data[keyName]) {
        const {total} = data[keyName]
        // if the state's covid data is available we will store it or we will store 0

        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0
        resultList.push({
          stateCode: keyName,
          name: statesList.find(state => state.stat_Code === keyName)
            .state_name,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
        console.log(resultList)
      }
    })
    return resultList
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
    console.log(event.target.value)
  }

  updateSearchInput = value => {
    this.setState({searchInput: value})
  }

  renderUnorderedList = () => {
    const {searchInput} = this.state
    const formattedList = statesList.map(each => ({
      stateCode: each.state_code,
      stateName: each.state_name,
    }))
    const filteredData = formattedList.filter(
      state =>
        state.stateCode.toLowerCase().includes(searchInput.toLowerCase()) ||
        state.stateName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (searchInput !== '') {
      return (
        <ul className="list-container">
          {filteredData.map(each => (
            <StateProfile
              statesDetails={each}
              key={each.stateCode}
              updateSearchInput={this.updateSearchInput}
            />
          ))}
        </ul>
      )
    }
    return null
  }

  renderList = () => (
    <div>
      <div>
        <p className="confirmed">Confirmed</p>
        <img
          src="https://res.cloudinary.com/drnjmmqvg/image/upload/v1639918320/check-mark_1_cqc5gf.png"
          className="confirmed-img"
          alt="confirmed"
        />
      </div>
      <div>
        <p className="active">Active</p>
        <img
          src="https://res.cloudinary.com/drnjmmqvg/image/upload/v1639919329/protection_1_rw7i8z.png"
          className="active-img"
          alt="active"
        />
      </div>
      <div>
        <p className="recovered">Recovered</p>
        <img
          src="https://res.cloudinary.com/drnjmmqvg/image/upload/v1639918800/recovered_1_vytegs.png"
          className="recovered-img"
          alt="recovered"
        />
      </div>
      <div>
        <p className="deceased">Deceased</p>
        <img
          src="https://res.cloudinary.com/drnjmmqvg/image/upload/v1639919077/breathing_1_un7c77.png"
          className="deceased-img"
          alt="deceased"
        />
      </div>
    </div>
  )

  renderListOfStates = () => (
    <div className="states-container">
      <div>
        <p className="states-ut">States/UT</p>
        <button type="button">
          <img
            src="https://res.cloudinary.com/drnjmmqvg/image/upload/v1639922969/sort_iok4kp.png"
            className="asc-img"
            alt="asc sort"
          />
        </button>
        <button type="button">
          <img
            src="https://res.cloudinary.com/drnjmmqvg/image/upload/v1639923251/sort_1_wdq3oi.png"
            className="desc-img"
            alt="desc sort"
          />
        </button>
        <p className="total-conformed">Conformed</p>
        <p className="total-active">Active</p>
        <p className="total-recovered">Recovered</p>
        <p className="total-deceased">Deceased</p>
        <p className="total-population">Population</p>
      </div>
      <hr className="line" />
      {this.convertObjectsDataIntoListItemsUsingForInMethod()}
    </div>
  )

  render() {
    const {searchInput} = this.state
    return (
      <div className="home-container">
        <Header />
        <div className="search-container">
          <BsSearch className="search-icon" />
          <div className="search-input">
            <input
              type="search"
              value={searchInput}
              className="search"
              placeholder="Enter the State"
              onChange={this.onChangeInput}
            />
            {this.renderUnorderedList()}
          </div>
        </div>
        {this.renderList()}
        {this.renderListOfStates()}
        <Footer />
      </div>
    )
  }
}

export default Home
