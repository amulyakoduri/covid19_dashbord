import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import Footer from '../Footer'
import FaqItem from '../FaqItem'
import './index.css'

class About extends Component {
  state = {
    faqsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getFaqs()
  }

  getFaqs = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
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
        isLoading: false,
      })
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="aboutRouteLoader">
      <Loader type="TailSpin" color="#0b69ff" height={50} width={50} />
    </div>
  )

  renderFaqsList = () => {
    const {faqsList, isLoading} = this.state
    return (
      <div className="about-container">
        <Header />
        {isLoading ? (
          this.renderLoader()
        ) : (
          <div>
            <h1 className="about">About</h1>
            <p className="update">Last update on march 28th 2021.</p>
            <p className="distribution">
              COVID-19 vaccines be ready for distribution
            </p>

            <ul className="list" testid="faqsUnorderedList">
              {faqsList.map(eachFaq => (
                <FaqItem key={eachFaq.qno} faqDetails={eachFaq} />
              ))}
            </ul>
          </div>
        )}
        <Footer />
      </div>
    )
  }

  render() {
    return <>{this.renderFaqsList()}</>
  }
}

export default About
