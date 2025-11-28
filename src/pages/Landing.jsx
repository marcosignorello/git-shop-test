import { useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import './Landing.css'

function Landing() {
  const navigate = useNavigate()

  const handleProductClick = (productId) => {
    if (productId === 'custom-plate') {
      navigate('/customize')
    } else {
      // For now, other products just go to customize or could have their own page
      // navigate(`/product/${productId}`)
      alert('This product page is coming soon! Try the Personalized Baby Plate.')
    }
  }

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Find the Perfect Gift</h1>
          <p className="hero-description">
            Discover unique, handpicked gifts for every occasion. From personalized keepsakes
            to curated gift boxes, we make gift-giving effortless and memorable.
          </p>
          <button className="cta-button" onClick={() => navigate('/customize')}>
            Start Customizing
          </button>
        </div>
      </section>

      <section className="featured-products">
        <h2 className="section-title">Featured Collection</h2>
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card" onClick={() => handleProductClick(product.id)}>
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                {product.id === 'custom-plate' && <span className="badge">Best Seller</span>}
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Landing
