import React, {useContext} from 'react';
import ItemCss from '../css/components/Item.module.css'
import {ITEM_ROUTE} from '../utils/consts'
import {useNavigate} from 'react-router-dom'
import {Context} from "../index";
import {createBasketItem} from "../http/itemAPI";

const Item = (props) => {
    const {user} = useContext(Context)

    const navigate = useNavigate()

    const itemClick = () => {
        navigate(ITEM_ROUTE + '/' + props.id)
    }

    const priceProps = props.price.toString()
    let price = priceProps
    if (priceProps.length > 3) {
        price = priceProps.slice(0, priceProps.length - 3) + ' ' + priceProps.slice(priceProps.length - 3, priceProps.length)
    }

    const addToBasket = () => {
        if (props.availability) {
            props.updateMessage("Товар добавлен в корзину")
            props.updateStyle("primary")
            createBasketItem(props.id, user.basket.id, 1).then(data => {})
        } else {
            props.updateMessage("Данного товара нет в наличии")
            props.updateStyle("danger")
        }
        props.updateStart(true)
    }

    return (
        <div className={ItemCss.item + ' col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12'}>
            <h2 className={ItemCss.name_item + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>{props.name}</h2>
            <div className={ItemCss.img + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                <img src={process.env.REACT_APP_API_URL + props.image} alt="" className={ItemCss.item_image} onClick={itemClick}/>
            </div>
            <h2 className={ItemCss.price_item + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>{price + ' ₽'}</h2>
            <div className='help-div col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                <button onClick={addToBasket}
                    className={ItemCss.add_to_bag + ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-10 offset-sm-1 col-6 offset-3'}>Добавить
                    в корзину
                </button>
            </div>
        </div>
    );
};

export default Item;