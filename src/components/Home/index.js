import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import StateProfile from '../StateProfile'
import TotalStates from '../TotalStates'
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
  state = {
    isLoading: true,
    searchInput: '',
    totalActiveCases: 0,
    totalConformedCases: 0,
    totalRecoveredCases: 0,
    totalDeceasedCases: 0,
    filteredSearchList: [],
    stateDetails: [],
  }

  componentDidMount() {
    this.getAllStates()
  }

  getAllStates = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      let nationalWiseActiveCases = 0
      let nationalWiseConformedCases = 0
      let nationalWiseRecoveredCases = 0
      let nationalWiseDeceasedCases = 0

      statesList.forEach(state => {
        if (data[state.state_code]) {
          const {total} = data[state.state_code]
          nationalWiseConformedCases += total.confirmed ? total.confirmed : 0
          nationalWiseRecoveredCases += total.recovered ? total.recovered : 0
          nationalWiseDeceasedCases += total.deceased ? total.deceased : 0
        }
      })
      nationalWiseActiveCases +=
        nationalWiseConformedCases -
        (nationalWiseRecoveredCases + nationalWiseDeceasedCases)

      const states = statesList.map(eachState => ({
        stateName: eachState.state_name,
        stateCode: eachState.state_code,
        confirmed: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(e => data[e].total.confirmed),
        recovered: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(e => data[e].total.recovered),
        deceased: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(e => data[e].total.deceased),
        other: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(e => data[e].total.other),
        population: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(e => data[e].meta.population),
      }))

      this.setState({
        totalActiveCases: nationalWiseActiveCases,
        totalRecoveredCases: nationalWiseRecoveredCases,
        totalConformedCases: nationalWiseConformedCases,
        totalDeceasedCases: nationalWiseDeceasedCases,
        isLoading: false,
        stateDetails: states,
      })
    }
  }

  searchItem = event => {
    const searchItem = event.target.value
    const searchResult = statesList.filter(
      state =>
        state.state_code.toLowerCase().includes(searchItem.toLowerCase()) ||
        state.state_name.toLowerCase().includes(searchItem.toLowerCase()),
    )
    this.setState({
      searchInput: event.target.value,
      filteredSearchList: searchResult,
    })
  }

  renderSearchResults = () => {
    const {filteredSearchList} = this.state
    console.log(filteredSearchList)
    return (
      <ul className="list-container" testid="searchResultsUnorderedList">
        {filteredSearchList.map(each => (
          <StateProfile
            stateName={each.state_name}
            stateCode={each.state_code}
            key={each.state_code}
            id={each.state_code}
          />
        ))}
      </ul>
    )
  }

  renderList = () => {
    const {
      totalActiveCases,
      totalConformedCases,
      totalDeceasedCases,
      totalRecoveredCases,
    } = this.state

    return (
      <>
        <div testid="countryWideConfirmedCases">
          <p className="confirmed">Confirmed</p>
          <img
            src="https://res.cloudinary.com/drnjmmqvg/image/upload/v1639918320/check-mark_1_cqc5gf.png"
            className="confirmed-img"
            alt="country wide confirmed cases pic"
          />
          <p className="conformed-value">{totalConformedCases}</p>
        </div>
        <div testid="countryWideActiveCases">
          <p className="active">Active</p>
          <img
            src="https://res.cloudinary.com/drnjmmqvg/image/upload/v1639919329/protection_1_rw7i8z.png"
            className="active-img"
            alt="country wide active cases pic"
          />
          <p className="active-value">{totalActiveCases}</p>
        </div>
        <div testid="countryWideRecoveredCases">
          <p className="recovered">Recovered</p>
          <img
            src="https://res.cloudinary.com/drnjmmqvg/image/upload/v1639918800/recovered_1_vytegs.png"
            className="recovered-img"
            alt="country wide recovered cases pic"
          />
          <p className="recovered-value">{totalRecoveredCases}</p>
        </div>
        <div testid="countryWideDeceasedCases">
          <p className="deceased">Deceased</p>
          <img
            src="https://res.cloudinary.com/drnjmmqvg/image/upload/v1639919077/breathing_1_un7c77.png"
            className="deceased-img"
            alt="country wide deceased cases pic"
          />
          <p className="deceased-value">{totalDeceasedCases}</p>
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="homeRouteLoader">
      <Loader type="TailSpin" color="#0b69ff" height={50} width={50} />
    </div>
  )

  whenAscendingSortButtonClicked = () => {
    const {stateDetails} = this.state
    const sortedList = stateDetails.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x > y ? 1 : -1
    })
    this.setState({stateDetails: sortedList})
  }

  whenDescendingSortButtonClicked = () => {
    const {stateDetails} = this.state
    const sortedList = stateDetails.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x < y ? 1 : -1
    })
    this.setState({stateDetails: sortedList})
  }

  renderListOfStates = () => {
    const {stateDetails} = this.state
    return (
      <div className="states-container" testid="stateWiseCovidDataTable">
        <div>
          <p className="states-ut">States/UT</p>
          <button
            type="button"
            className="order"
            onClick={this.whenAscendingSortButtonClicked}
            testid="ascendingSort"
          >
            <FcGenericSortingAsc className="asc-img" />
          </button>
          <button
            type="button"
            className="order"
            testid="descendingSort"
            onClick={this.whenDescendingSortButtonClicked}
          >
            <FcGenericSortingDesc className="desc-img" />
          </button>
          <p className="total-conformed">Conformed</p>
          <p className="total-active">Active</p>
          <p className="total-recovered">Recovered</p>
          <p className="total-deceased">Deceased</p>
          <p className="total-population">Population</p>
        </div>
        <hr className="line" />
        <ul className="state-details-list">
          {stateDetails.map(eachState => (
            <TotalStates
              key={eachState.stateCode}
              stateCases={eachState}
              id={eachState.stateCode}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="homeRouteLoader">
      <Loader type="TailSpin" color="#0b69ff" height={50} width={50} />
    </div>
  )

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
    console.log(event.target.value)
  }

  removeFilteredList = () => {
    this.setState({filteredSearchList: []})
  }

  render() {
    const {searchInput, isLoading, filteredSearchList} = this.state
    const showSearchResult =
      filteredSearchList.length === 0 ? '' : this.renderSearchResults()
    return (
      <>
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
                onChange={this.searchItem}
                onAbort={this.removeFilteredList}
              />
            </div>
            {searchInput.length > 0 ? showSearchResult : ''}
          </div>
          {isLoading ? (
            this.renderLoader()
          ) : (
            <div>
              <div>{this.renderList()}</div>
              <div>{this.renderListOfStates()}</div>
              <div className="footer-item">
                <Footer />
              </div>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default Home
