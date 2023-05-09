import React, { useState } from "react";
import Header from "./Header";

function Login({ children }) {

    const [login, setLogin] = useState
    const [password, setPassword] = useState


    function handleChangeLogin(e) {
        setLogin(e.target.value)
    }

    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    return (
        <>
            {children}
            {/* возможно стоит передать имена ссылок и кнопок через пропсы а доп спан через чилдрен */}
            {/* <Header textLink={'Регистрация'}></Header> */}
            <div className="login-container">

                <div className="auth__form-container">

                    <h3 className="auth__text">Вход</h3>
                    <form className="auth__form" name="aaa">


                        <input
                            type="email" name="name" id="name" className="auth__input popup__input_type_name" required minLength="2"
                            maxLength="40" placeholder="Email" onChange={handleChangeLogin}
                        />

                        <span className="popup__error" id="name-error">
                        </span>

                        <input type="password" name="info" id="info" className="auth__input popup__input_type_info" required minLength="2"
                            maxLength="200" placeholder="Пароль" onChange={handleChangePassword}/>
                        <span className="popup__error" id="info-error">
                        </span>

                        <button className="auth__button" type="submit">Войти</button>

                        {/* тут должен быть чилдрен на ссылку при регистрации */}
                    </form>
                    {/* END FORM */}

                </div>

            </div>
        </>
    )
}

export default Login;