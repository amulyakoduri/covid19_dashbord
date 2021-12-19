import './index.css'

const FaqItem = props => {
  const {faqDetails} = props
  const {question, answer} = faqDetails

  return (
    <li className="faq-container">
      <p className="question">{question}</p>
      <p className="answer ">{answer}</p>
    </li>
  )
}

export default FaqItem
