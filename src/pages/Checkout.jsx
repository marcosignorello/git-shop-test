import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Checkout.css'

function Checkout() {
    const { cartTotal, clearCart } = useCart()
    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsProcessing(true)

        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false)
            setIsSuccess(true)
            clearCart()
        }, 2000)
    }

    if (isSuccess) {
        return (
            <div className="checkout-page success-message">
                <div className="success-icon">🎉</div>
                <h1>Order Placed Successfully!</h1>
                <p>Thank you for your purchase. You will receive an email confirmation shortly.</p>
                <button className="cta-button" onClick={() => navigate('/')}>
                    Return Home
                </button>
            </div>
        )
    }

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>
            <div className="checkout-container">
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h2>Shipping Information</h2>
                        <div className="form-row">
                            <input type="text" placeholder="First Name" required />
                            <input type="text" placeholder="Last Name" required />
                        </div>
                        <input type="email" placeholder="Email Address" required />
                        <input type="text" placeholder="Address" required />
                        <div className="form-row">
                            <input type="text" placeholder="City" required />
                            <input type="text" placeholder="Zip Code" required />
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Payment Details</h2>
                        <input type="text" placeholder="Card Number" required />
                        <div className="form-row">
                            <input type="text" placeholder="MM/YY" required />
                            <input type="text" placeholder="CVC" required />
                        </div>
                    </div>

                    <button type="submit" className="place-order-button" disabled={isProcessing}>
                        {isProcessing ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Checkout
