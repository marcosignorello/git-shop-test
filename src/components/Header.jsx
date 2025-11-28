import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

function Header() {
    const { cartCount } = useCart();

    return (
        <header className="site-header">
            <div className="header-content">
                <Link to="/" className="logo">
                    🎁 GiftShop
                </Link>
                <nav className="main-nav">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/customize" className="nav-link">Customize</Link>
                </nav>
                <div className="header-actions">
                    <Link to="/cart" className="cart-link">
                        🛒 <span className="cart-count">{cartCount}</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
