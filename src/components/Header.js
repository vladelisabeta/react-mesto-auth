import React from "react";
import logo from '../images/logo.svg';
import { Routes, Route, Link } from "react-router-dom";

function Header({ textLink, path, onLogOut, isLoggedIn, email }) {
  const headerLink = `header__link ${isLoggedIn && 'header__link_hidden'}`
  const headerEmail = `header__email ${!isLoggedIn && 'header__email_hidden'}`
  const headerLogOut = `header__logout ${!isLoggedIn && 'header__logout_hidden'}`

  return (
    <header className="header content">
      <img src={logo} alt="Логотип Место" className="header__logo" />
      <div className="header__container-button-link">
        <Link className={headerLink} to={path}>{textLink}</Link>
        <p className={headerEmail}>{email}</p>
        {/* это типа кнопка */}
        <a className={headerLogOut} onClick={onLogOut}>Выйти</a>
      </div>
    </header>
  )
}

export default Header;
