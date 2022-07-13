import React, {useContext, useEffect, useState} from 'react';
import filterImg from "../img/filter.svg";
import xImg from "../img/x.svg";
import minusImg from "../img/minus.svg";
import plusGreenImg from "../img/plus_green.svg";
import BasketCss from '../css/components/Basket.module.css'
import {useNavigate} from 'react-router-dom'
import {
    decrementBasketItem,
    deleteOneBasketItem,
    fetchOneItem, getAllBasketItems,
    incrementBasketItem
} from "../http/itemAPI";
import {ITEM_ROUTE} from "../utils/consts";
import {Context} from "../index";


const BasketItem = (props) => {

    const {user} = useContext(Context)
    const {item} = useContext(Context)

    const [countValue, setCountValue] = useState(props.count)
    const [drawItem, setDrawItem] = useState({})
    const [price, setPrice] = useState('')
    const [fullPrice, setFullPrice] = useState('')

    const navigate = useNavigate()


    const setFull = () =>{
        let sm = price.slice(0, price.length-4) + price.slice(price.length-3, price.length)

        let fullPriceData = (Number(sm) * countValue).toString()

        if (fullPriceData.length > 3) {
            fullPriceData = fullPriceData.slice(0, fullPriceData.length - 3) + ' ' + fullPriceData.slice(fullPriceData.length - 3, fullPriceData.length)

            if (fullPriceData.length > 7) {
                fullPriceData = fullPriceData.slice(0, fullPriceData.length - 7) + ' ' + fullPriceData.slice(fullPriceData.length - 7, fullPriceData.length)
            }
        }

        console.log(fullPriceData)

        setFullPrice(fullPriceData)
    }

    useEffect(() => {
        fetchOneItem(props.itemId).then(data => {
            let priceData = data.price.toString()
            if (priceData.length > 3) {
                setPrice((priceData.slice(0, priceData.length - 3) + ' ' + priceData.slice(priceData.length - 3, priceData.length)).toString())
            }

            setDrawItem(data)
        })
    }, [item.basketItems])

    useEffect(() => {
        setFull()
    }, [price, countValue])

    const itemClick = () => {
        navigate(ITEM_ROUTE + '/' + props.itemId)
    }

    const increment = () => {
        if (countValue < 99) {
            incrementBasketItem(drawItem.id, props.basketId).then(() => {
                setCountValue(countValue + 1)
                let prMas = item.basketItems.map(item => {
                    if (item[2].id === drawItem.id) {
                        item[0]++
                    }
                    return item
                })
                item.setBasketItems(prMas)
            })
            setFull()
        }
    }

    const decrement = () => {
        if (countValue > 1) {
            decrementBasketItem(drawItem.id, props.basketId).then(() => {
                setCountValue(countValue - 1)
                let prMas = item.basketItems.map(item => {
                    if (item[2].id === drawItem.id) {
                        item[0]--
                    }
                    return item
                })
                item.setBasketItems(prMas)
            })
            setFull()
        }
    }

    const deleteBasketItem = () => {
        deleteOneBasketItem(props.itemId, props.basketId).then(data => {
            setDrawItem({})
            let mas = []
            getAllBasketItems(user.basket.id).then(data => {
                data.rows.map(dataItem => {
                    console.log(data)
                    fetchOneItem(dataItem.itemId).then(data => {
                        mas.push([dataItem.count, dataItem.basketId, data])
                    }).finally(() => {
                        item.setBasketItems(mas)
                        //console.log(item.basketItems)
                    })
                })
            }).finally(() => {
                item.setBasketItems(mas)
            })
        })
    }

    return (
        <div className={BasketCss.item + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'}>
            <h1 className={BasketCss.item_name + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>{drawItem.name}</h1>
            <div className={BasketCss.img + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                <img src={process.env.REACT_APP_API_URL + drawItem.img1} alt="" className={BasketCss.image} onClick={itemClick}/>
            </div>
            <h2 className={BasketCss.first_price + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>{price + ' ₽'}</h2>
            <div className={BasketCss.counter + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                <div className={BasketCss.change} onClick={decrement}>
                    <img src={require("../img/chevron-left.svg")} alt="" className={BasketCss.chevron}/>
                </div>
                <h2 className={BasketCss.count}>{countValue}</h2>
                <div className={BasketCss.change} onClick={increment}>
                    <img src={require("../img/chevron-right.svg")} alt="" className={BasketCss.chevron}/>
                </div>
            </div>
            <div className={BasketCss.help_delete + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                <div className={BasketCss.delete_item} onClick={deleteBasketItem}>
                    <img src={require("../img/x_white.svg")} alt="" className={BasketCss.delete}/>
                </div>
            </div>
            <h2 className={BasketCss.full_price + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>{fullPrice + ' ₽'}</h2>
        </div>
    );
};

export default BasketItem;