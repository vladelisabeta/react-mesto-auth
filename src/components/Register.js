import React from "react";
import Login from "./Login";
import Header from "./Header";

function Register({ children }) {
    return (
        <>
        {children}
        <div className="login-container">

            <div className="auth__form-container">

                <h3 className="auth__text">Регистрация</h3>
                <form className="auth__form" name="aaa">


                    <input
                        type="email" name="name" id="name" className="auth__input popup__input_type_name" required minLength="2"
                        maxLength="40" placeholder="Email"
                    />

                    <span className="popup__error" id="name-error">
                    </span>

                    <input type="text" name="info" id="info" className="auth__input popup__input_type_info" required minLength="2"
                        maxLength="200" placeholder="Пароль" />
                    <span className="popup__error" id="info-error">
                    </span>

                    <button className="auth__button" type="submit">Зарегистрироваться</button>
                </form>

                <a className="auth__login-move" >
                    Уже зарегистрированы? Войти
                </a>

            </div>

        </div>
        </>
    )
}

export default Register;