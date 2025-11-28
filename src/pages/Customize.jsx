import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Canvas from '../components/Canvas'
import SideMenu from '../components/SideMenu'
import './Customize.css'

function Customize() {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [customization, setCustomization] = useState({
    sex: 'boy',
    designDetail: null,
    babyName: '',
    color: '#FF6B9D'
  })

  const updateCustomization = (key, value) => {
    setCustomization(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleAddToCart = () => {
    // Create a product object for the custom plate
    const product = {
      id: 'custom-plate',
      name: 'Personalized Baby Plate',
      price: 29.99,
      image: 'https://placehold.co/400x500/f5f5f5/333333?text=Baby+Plate' // In a real app, we'd generate a thumbnail
    }

    addToCart(product, customization)
    navigate('/cart')
  }

  return (
    <div className="customize-page">
      <div className="customize-container">
        <div className="canvas-column">
          <Canvas customization={customization} />
        </div>
        <div className="menu-column">
          <SideMenu
            customization={customization}
            updateCustomization={updateCustomization}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  )
}

export default Customize

