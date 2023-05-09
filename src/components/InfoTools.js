import React, { useState } from "react";
import iconError from '../images/image-error.svg'
import iconSuccess from '../images/image-succes.svg'

function InfoTools({ isOpen,
    onClose }) {
    // const popupStatusClassName = `popup ${name} ${isOpen ? 'popup_opened' : ''}`

    const [isSuccess, setIsSuccess] = useState(true)
    const icon = `${isSuccess ? iconSuccess : iconError}`;
    const text = `${isSuccess
        ? 'Вы успешно зарегистрировались!'
        : (`Что-то пошло не так!
          Попробуйте ещё раз.`)}`

    return (
        <div className='popup popup_infotools'>
            <div className="popup__box">
                <button className={`popup__button-close`} type="button" onClick={onClose} />
                <div className={`popup__container popup__container_cards`}>
                    <img className="popup__infotool-icon" src={icon}></img>
                    <h3 className="popup__text popup__text_infotool">{text}</h3>
                </div>
            </div>
        </div>
    )
}

export default InfoTools;