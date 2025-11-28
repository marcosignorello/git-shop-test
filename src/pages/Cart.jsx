import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Cart.css'

function Cart() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()
    const navigate = useNavigate()

    if (cartItems.length === 0) {
        return (
            <div className="cart-page empty-cart">
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any gifts yet.</p>
                <Link to="/" className="cta-button">Start Shopping</Link>
            </div>
        )
    }

    return (
        <div className="cart-page">
            <h1 className="page-title">Your Cart</h1>

            <div className="cart-container">
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.cartId} className="cart-item">
                            <div className="item-image">
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className="item-details">
                                <h3>{item.name}</h3>
                                {item.customization && (
                                    <div className="item-customization">
                                        <p>Name: {item.customization.babyName || 'None'}</p>
                                        <p>Sex: {item.customization.sex}</p>
                                        <p>Color: <span className="color-dot" style={{ backgroundColor: item.customization.color }}></span></p>
                                    </div>
                                )}
                                <p className="item-price">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="item-actions">
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item.cartId, -1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.cartId, 1)}>+</button>
                                </div>
                                <button className="remove-button" onClick={() => removeFromCart(item.cartId)}>
                                    Remove
                                </button>
                            </div>
                            <div className="item-total">
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="summary-total">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <button className="checkout-button" onClick={() => navigate('/checkout')}>
                        Proceed to Checkout
                    </button>
                    <button className="clear-cart-button" onClick={clearCart}>
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart
