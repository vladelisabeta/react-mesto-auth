import React from "react";
import logo from '../images/logo.svg';
import { Routes, Route, Link } from "react-router-dom";

function Header({textLink}) {
  return (
    <header className="header content">
      <img src={logo} alt="Логотип Место" className="header__logo" />
      <a className="header__link">{textLink}</a>
    </header>

  )
}

export default Header;

// имеет  смысл создать два отдельных компонента и передать им разные хедеры 