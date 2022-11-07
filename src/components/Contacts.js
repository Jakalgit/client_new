import React, {useState} from 'react';
import style_css from "../css/components/Contacts.module.css"
import MessageModal from "./MessageModal";

const Contacts = () => {

    const [showMessage, setShowMessage] = useState(false)

    const updateShow = (value) => {
        setShowMessage(value)
    }

    return (
        <div>
            <MessageModal show={showMessage} updateShow={(value) => updateShow(value)}/>
            <div>
                {!showMessage ?
                    <div className={style_css.contacts}>
                        <div className={style_css.telegram + ' ' + style_css.circle}>
                            <img src={require("../img/telegram.png")} alt="" className={style_css.tg + ' ' + style_css.image}/>
                        </div>
                        <div className={style_css.chats + ' ' + style_css.circle} onClick={(e) => {setShowMessage(true); e.stopPropagation()}}>
                            <img src={require("../img/chat.png")} alt="" className={'chat ' + style_css.image}/>
                        </div>
                    </div>
                    :
                    <div/>
                }
            </div>
        </div>
    );
};

export default Contacts;