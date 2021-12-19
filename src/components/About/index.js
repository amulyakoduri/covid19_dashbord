import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'

import Footer from '../Footer'
import FaqItem from '../FaqItem'
import './index.css'

class About extends Component {
  state = {
    faqsList: [],
  }

  componentDidMount() {
    this.getFaqs()
  }

  getFaqs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.faq.map(eachFaq => ({
        answer: eachFaq.answer,
        category: eachFaq.category,
        qno: eachFaq.qno,
        question: eachFaq.question,
      }))
      this.setState({
        faqsList: updatedData,
      })
    }
  }

  renderFaqsList = () => {
    const {faqsList} = this.state
    return (
      <div className="about-container">
        <Header />
        <>
          <h1 className="about">About</h1>
          <p className="update">Last update on march 28th 2021.</p>
          <p className="distribution">
            COVID-19 vaccines be ready for distribution
          </p>
        </>
        <ul className="list">
          {faqsList.map(eachFaq => (
            <FaqItem key={eachFaq.qno} faqDetails={eachFaq} />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    return <>{this.renderFaqsList()}</>
  }
}

export default About
