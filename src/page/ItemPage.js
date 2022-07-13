import React, {useContext, useEffect, useState} from 'react';
import plusGreenImg from '../img/plus_green.svg'
import minusImg from '../img/minus.svg'
import ItemPageCss from '../css/ItemPage.module.css'
import Footer from "../components/Footer";
import {useParams} from "react-router-dom";
import {
    createBasketItem,
    decrementBasketItem,
    fetchAllInfo,
    fetchOneItem,
    getAllBasketItems,
    incrementBasketItem
} from "../http/itemAPI";
import {Context} from "../index";
import {Carousel, Spinner} from "react-bootstrap";
import Alert from "../components/Alert";

const ItemPage = () => {

    const {item} = useContext(Context)
    const {user} = useContext(Context)

    let [countValue, setCountValue] = useState(1)
    const [itemPg, setItem] = useState({})
    const {id} = useParams()

    const [start, setStart] = useState(false)
    const [message, setMessage] = useState('')
    const [style, setStyle] = useState('primary')

    const [info, setInfo] = useState([])

    const [loading, setLoading] = useState(true)

    const [price, setPrice] = useState('')

    useEffect(() => {
        fetchOneItem(id).then(data => {
            setItem(data)
            let mas = []
            fetchAllInfo(data.id).then(data => {
                setInfo(data.rows)
            })
            getAllBasketItems(user.basket.id).then(data => {
                data.rows.map(dataItem => {
                    fetchOneItem(dataItem.itemId).then(data => {
                        mas.push([dataItem.count, dataItem.basketId, data])
                    }).finally(() => {
                        item.setBasketItems(mas)
                        item.basketItems.map(item => {
                            if (item[2].id === Number(id)) {
                                console.log(item[0])
                                setCountValue(item[0])
                            }
                            return item
                        })
                    })
                })
            }).finally(() => {
                setLoading(false)
            })
        })
    }, [])

    useEffect(() => {
        if (itemPg.price) {
            let priceSTR = itemPg.price.toString()
            if (priceSTR.length > 3) {
                setPrice(priceSTR.slice(0, priceSTR.length - 3) + ' ' + priceSTR.slice(priceSTR.length - 3, priceSTR.length))
            } else {
                setPrice(priceSTR)
            }
        }
    }, [itemPg])

    useEffect(() => {
        if (start) {
            setTimeout(() => {
                setStart(false)
            }, 2500)
        }
    }, [start])

    const increment = () => {
        if (countValue < 99) {
            incrementBasketItem(id, user.basket.id).then(() => {
                setCountValue(countValue + 1)
                let prMas = item.basketItems.map(item => {
                    if (item[2].id === id) {
                        item[0]++
                    }
                    return item
                })
                item.setBasketItems(prMas)
            })
        }
    }

    const decrement = () => {
        if (countValue > 1) {
            decrementBasketItem(id, user.basket.id).then(() => {
                setCountValue(countValue - 1)
                let prMas = item.basketItems.map(item => {
                    if (item[2].id === id) {
                        item[0]--
                    }
                    return item
                })
                item.setBasketItems(prMas)
            })
        }
    }

    const addToBasket = () => {
        if (itemPg.availability) {
            createBasketItem(itemPg.id, user.basket.id, countValue).then(data => {setMessage("Товар добавлен в корзину"); setStyle("primary")})
        } else {
            setMessage("Данного товара нет в наличии")
            setStyle("danger")
        }
        setStart(true)
    }

    const updateStart = (value) => {
        setStart(value)
    }

    if (loading) {
        return <Spinner animation={"grow"} />
    }

    return (

        <div>
            <Alert start={start} variant={style} text={message} updateStart={(value) => updateStart(value)} />
            <div className={ItemPageCss.item_block}>
                <div className="container">
                    <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <Carousel variant={"dark"}>
                                    <Carousel.Item>
                                        <div className={ItemPageCss.img}>
                                            <img src={process.env.REACT_APP_API_URL + itemPg.img1} alt="" className={ItemPageCss.image}/>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className={ItemPageCss.img}>
                                            <img src={process.env.REACT_APP_API_URL + itemPg.img2} alt="" className={ItemPageCss.image}/>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className={ItemPageCss.img}>
                                            <img src={process.env.REACT_APP_API_URL + itemPg.img3} alt="" className={ItemPageCss.image}/>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className={ItemPageCss.img}>
                                            <img src={process.env.REACT_APP_API_URL + itemPg.img4} alt="" className={ItemPageCss.image}/>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        <div className={ItemPageCss.inf + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'}>
                            <div className='flex-block col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                                <h2 className={ItemPageCss.item_name + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>{itemPg.name}</h2>
                                {itemPg.availability ?
                                    <div className={ItemPageCss.help_ava + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                        <div className={ItemPageCss.availability + ' ' + ItemPageCss.availability_green}>
                                            <img src={require("../img/check.svg")} alt="" className={ItemPageCss.ava}/>
                                        </div>
                                        <h2 className={ItemPageCss.availability_text}>В наличии</h2>
                                    </div>
                                    :
                                    <div className={ItemPageCss.help_ava + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                        <div className={ItemPageCss.availability + ' ' + ItemPageCss.availability_red}>
                                            <img src={require("../img/x_black.svg")} alt="" className={ItemPageCss.ava}/>
                                        </div>
                                        <h2 className={ItemPageCss.availability_text}>Нет в наличии</h2>
                                    </div>
                                }
                                <div className={ItemPageCss.counter + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                    <div className={ItemPageCss.change} onClick={decrement}>
                                        <img src={require("../img/chevron-left.svg")} alt="" className={ItemPageCss.chevron}/>
                                    </div>
                                    <h2 className={ItemPageCss.count}>{countValue}</h2>
                                    <div className={ItemPageCss.change} onClick={increment}>
                                        <img src={require("../img/chevron-right.svg")} alt="" className={ItemPageCss.chevron}/>
                                    </div>
                                </div>
                                <h2 className={ItemPageCss.price + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>{price + ' ₽'}</h2>
                                <button onClick={addToBasket}
                                    className={ItemPageCss.add_to_bag + ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>Добавить
                                    в корзину
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="des-block">
                <div className={ItemPageCss.des_back}>
                    <div className="container">
                        <div className="row">
                            {info.map(i =>
                                <h2 className={ItemPageCss.description + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}>
                                    {i.info}
                                </h2>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ItemPage;