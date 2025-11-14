import { useNavigate } from 'react-router-dom'
import '../App.css'

function Landing() {
  const navigate = useNavigate()

  const handleCTAClick = () => {
    navigate('/customize')
  }

  return (
    <div className="App">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Find the Perfect Gift</h1>
          <p className="hero-description">
            Discover unique, handpicked gifts for every occasion. From personalized keepsakes 
            to curated gift boxes, we make gift-giving effortless and memorable.
          </p>
          <button className="cta-button" onClick={handleCTAClick}>
            Shop Now
          </button>
        </div>
      </section>
    </div>
  )
}

export default Landing

