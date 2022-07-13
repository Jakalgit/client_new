import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import BasketPageCss from '../css/BasketPage.module.css'
import {deleteAllBasketItem, fetchOneItem, getAllBasketItems, initBasket} from "../http/itemAPI";
import BasketItem from "../components/BasketItem";
import Footer from "../components/Footer";
import {Spinner} from "react-bootstrap";
import DownCategoryCss from "../css/admin/CreateDownCategory.module.css";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {CREATEORDER_ROUTE, FIND_ROUTE} from "../utils/consts";

const BasketPage = observer(() => {

    const {user} = useContext(Context)
    const {item} = useContext(Context)

    const [loading, setLoading] = useState(true)
    const [fullPrice, setFullPrice] = useState(0)
    const [drawBasketItems, setDrawBasketItems] = useState(item.basketItems)

    const navigate = useNavigate()

    useEffect(() => {
        let mas = []
        getAllBasketItems(user.basket.id).then(data => {
            data.rows.map(dataItem => {
                fetchOneItem(dataItem.itemId).then(data => {
                    mas.push([dataItem.count, dataItem.basketId, data])
                }).finally(() => {
                    item.setBasketItems(mas)
                })
            })
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        setDrawBasketItems(item.basketItems)
        let sum = 0
        item.basketItems.map(basketItem => {
            sum += basketItem[0] * basketItem[2].price
        })
        setFullPrice(sum)
    }, [item.basketItems])

    const createOrder = () => {
        navigate(CREATEORDER_ROUTE)
    }

    const deleteAllBasketItems = () => {
        deleteAllBasketItem(user.basket.id).then(data => {
            item.setBasketItems([])
            setDrawBasketItems(item.basketItems)
        })
    }

    if (loading) {
        return <Spinner animation={"grow"} className={DownCategoryCss.spinner} />
    }

    return (
        <div>
            {drawBasketItems.length !== 0 ?
                <div>


                    <div className={BasketPageCss.section_line}>
                        <div className="container">
                            <div className="row">
                                <h1 className={BasketPageCss.your_basket + ' col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-5 offset-md-0 col-sm-6 offset-sm-0 col-12'}>Ваша
                                    корзина</h1>
                                <div className={BasketPageCss.help_clean + ' col-xxl-1 offset-xxl-4 col-xl-1 offset-xl-4 col-lg-1 offset-lg-4 col-md-1 offset-md-2 col-sm-2 offset-sm-0 col-2 offset-2'}>
                                    <div className={BasketPageCss.clean_all} onClick={deleteAllBasketItems}>
                                        <img src={require("../img/x_black.svg")} alt="" className={BasketPageCss.close}/>
                                    </div>
                                </div>
                                <button className={BasketPageCss.checkout + ' col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-4 col-5'}
                                        onClick={createOrder}>
                                    Оформить заказ
                                    <img src={require("../img/shopping-cart.svg")} alt="" className={BasketPageCss.card}/>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="list-item">
                        <div className="container">
                            <div className="row">
                                {drawBasketItems.map(drawBasketItem =>
                                    <BasketItem itemId={drawBasketItem[2].id} count={drawBasketItem[0]}
                                                basketId={drawBasketItem[1]}/>
                                )}
                            </div>
                        </div>
                    </div>

                    <Footer/>
                </div>
                :
                <h2 className={BasketPageCss.empty_text}>Добавьте товары</h2>
            }
        </div>
    );
});

export default BasketPage;