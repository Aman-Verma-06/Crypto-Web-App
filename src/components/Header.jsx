import { Link } from 'react-router-dom'
import { FaBitcoin } from "react-icons/fa6";
import './Header.css'

const Header = () => {
    return (
        <>
            <div className="nav-position">
                <div className="navbar">
                    <div className="logo">
                        <h1>Crypto-Era</h1>
                        <FaBitcoin color='orange' size='50' />
                    </div>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li style={{ marginRight: '2rem' }}><Link to='/coins'>Coins</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Header
