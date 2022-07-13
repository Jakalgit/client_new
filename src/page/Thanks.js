import React, {useContext} from 'react';
import BasketPageCss from "../css/BasketPage.module.css";
import {Context} from "../index";
import style_css from "../css/Thanks.module.css"

const Thanks = () => {

    const {order} = useContext(Context)

    return (
        <div>
            <h2 className={BasketPageCss.empty_text}>Спасибо за покупку!<br/>Ваш заказ обрабатывается<br/><p className={style_css.number}>{'№ ' + order.number}</p></h2>
        </div>
    );
};

export default Thanks;