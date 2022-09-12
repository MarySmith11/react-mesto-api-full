import React from 'react';
import logo from '../images/logo.svg';
import NavBar from './NavBar';

function Header(props) {
    return (
        <header className="header">
            <img src={logo} alt="место" className="header__logo" />
            <NavBar loggedIn={props.loggedIn} userEmail={props.userEmail} handleLogout={props.handleLogout} /> 
        </header>
    )
}
export default Header;