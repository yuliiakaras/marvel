import { NavLink, Link } from "react-router-dom";

import "./header.css";

const Header = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel </span>
                    information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink style={({isActive}) => ({color: isActive ? 'var(--primary)' : 'inherit'})} to="/">Characters</NavLink>

                    </li>
                    /
                    <li>
                        <NavLink style={({isActive}) => ({color: isActive ? 'var(--primary)' : 'inherit'})} to="/comics">Comics</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
