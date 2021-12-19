import './index.css'

const NotFound = props => {
  const onClickHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="container">
      <img
        src="https://res.cloudinary.com/drnjmmqvg/image/upload/v1639569085/Vector_2_fwcmya.png"
        className="img"
        alt="not"
      />
      <img
        src="https://res.cloudinary.com/drnjmmqvg/image/upload/v1639570546/Vector_3_ijo1de.png"
        className="v1"
        alt="v1"
      />
      <img
        src="https://res.cloudinary.com/drnjmmqvg/image/upload/v1639571156/Vector_4_zzz4ae.png"
        className="v2"
        alt="v2"
      />
      <img
        src="https://res.cloudinary.com/drnjmmqvg/image/upload/v1639571532/Vector_5_t1qxx8.png"
        className="v3"
        alt="v3"
      />
      <img
        src="https://res.cloudinary.com/drnjmmqvg/image/upload/v1639571755/Vector_6_dy9gig.png"
        className="v4"
        alt="v4"
      />
      <img
        src="https://res.cloudinary.com/drnjmmqvg/image/upload/v1639571992/Vector_7_l0pnkr.png"
        className="v5"
        alt="v5"
      />
      <img
        src="https://res.cloudinary.com/drnjmmqvg/image/upload/v1639572295/Vector_8_btetsn.png"
        className="v6"
        alt="v6"
      />
      <img src="" className="v7" alt="v7" />
      <img src="" className="v8" alt="v8" />
      <img src="" className="v9" alt="v9" />
      <img src="" className="v" alt="v" />
      <img src="" className="v" alt="v" />
      <img src="" className="v" alt="v" />
      <img src="" className="v" alt="v" />
      <h1 className="heading">PAGE NOT FOUND</h1>
      <p className="paragraph">
        we’re sorry, the page you requested could not be found Please go back to
        the homepage
      </p>
      <div className="button-container">
        <button type="button" className="button" onClick={onClickHome}>
          <p className="button-text">Home</p>
        </button>
      </div>
    </div>
  )
}

export default NotFound
