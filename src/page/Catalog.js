import React, {useContext, useEffect, useState} from 'react';
import Filters from "../components/Filters";
import CatalogCss from '../css/Catalog.module.css'
import Item from '../components/Item'
import Fade from 'react-reveal/Fade';
import {Context} from "../index";
import Footer from "../components/Footer";
import {observer} from "mobx-react-lite";
import {fetchBrands} from "../http/API/brandAPI"
import {fetchDownCategories} from "../http/API/downCategoryAPI"
import {fetchCategories} from "../http/API/categoryAPI"
import {fetchPageItems} from "../http/API/itemAPI"
import {initBasket} from "../http/API/basketAPI"
import Page from "../components/Page";
import Alert from "../components/Alert";
import {Spinner} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import {DISCOUNT_ROUTE, FIND_ROUTE, NEW_ROUTE, POPULAR_ROUTE, REPAIR_ROUTE} from "../utils/consts";
import "../css/components/Alert.css"
import general from "../css/General.module.css";
import FindLine from "../components/FindLine";

const Catalog = observer(() => {

    document.title = 'Каталог'

    const {item} = useContext(Context)
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)

    const [items, setItems] = useState([])

    const [currentCategoryName, setCurrentCategoryName] = useState('')
    const [currentDownCategoryName, setCurrentDownCategoryName] = useState('')
    const [currentBrandName, setCurrentBrandName] = useState('')
    const [currentScale, setCurrentScale] = useState(null)

    const [start, setStart] = useState(false)
    const [message, setMessage] = useState('')
    const [style, setStyle] = useState('primary')

    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        initBasket(user.user.id).then(data => {
            user.setBasket(data)
            fetchCategories().then(data => {
                item.setCategories(data)
                fetchDownCategories().then(data => {
                    item.setDownCategories(data)
                    fetchBrands().then(data => {
                        item.setBrands(data)
                        fetchPageItems(null, null, null, null,true, true, null, 1).then(data => {
                            item.setTotalCount(data.count)
                            setItems(data.rows)
                            setLoading(false)
                        })
                    })
                })
            })
        })
    }, [])

    useEffect(() => {
        fetchPageItems(item.currentCategory === -1 ? null : item.currentCategory,
            item.currentDownCategory === -1 ? null : item.currentDownCategory,
            item.currentBrand === -1 ? null : item.currentBrand, currentScale === null ? null : currentScale.id,
            !item.currentAvailability, true, null, item.page).then(data => {
                setItems([])
                item.setTotalCount(data.count)
                setItems(data.rows)

                findNameDownCategoryById()
                findNameCategoryById()
                findNameBrandById()
        })
    }, [currentScale, item.page, item.currentCategory, item.currentDownCategory, item.currentBrand, item.currentAvailability])

    useEffect(() => {
        findNameDownCategoryById()
        findNameCategoryById()
        findNameBrandById()
    }, [item.categories, item.downCategories, item.brands])

    useEffect(() => {
        if (start) {
            setTimeout(() => {
                setStart(false)
            }, 2500)
        }
    }, [start])

    const findNameCategoryById = () => {
        if (item.currentCategory !== -1) {
            item.categories.forEach(category => {
                if (category.id === item.currentCategory) {
                    setCurrentCategoryName(category.name)
                }
            })
        }
    }

    const findNameDownCategoryById = () => {
        if (item.currentDownCategory !== -1) {
            item.downCategories.forEach(downCategory => {
                if (downCategory.id === item.currentDownCategory) {
                    setCurrentDownCategoryName(downCategory.name)
                }
            })
        }
    }

    const findNameBrandById = () => {
        if (item.currentBrand !== -1) {
            item.brands.forEach(brand => {
                if (brand.id === item.currentBrand) {
                    setCurrentBrandName(brand.name)
                }
            })
        }
    }

    const updateMessage = (value) => {
        setMessage(value)
    }

    const updateStart = (value) => {
        setStart(value)
    }

    const updateStyle = (value) => {
        setStyle(value)
    }

    const updateCurrentScale = (value) => {
        setCurrentScale(value)
    }

    if (loading) {
        return (
            <div className={general.loading}>
                <Spinner animation="border" variant="secondary" />
            </div>
        )
    }

    return (

        <div>
            <Alert start={start} variant={style} text={message} updateStart={(value) => updateStart(value)}/>

            <div className={CatalogCss.cards}>
                <div className="container">
                    <div className="row">
                        <Fade left>
                            <div onClick={() => navigate(NEW_ROUTE)} className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                                <div className={CatalogCss.card}>
                                    <h2 className={CatalogCss.card_text}>Новинки</h2>
                                    <h2 className={CatalogCss.card_icon} style={{backgroundColor: "#00E5FF"}}>new</h2>
                                </div>
                            </div>
                        </Fade>
                        <Fade left>
                            <div onClick={() => navigate(POPULAR_ROUTE)} className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                                <div className={CatalogCss.card}>
                                    <h2 className={CatalogCss.card_text}>Популярное</h2>
                                    <h2 className={CatalogCss.card_icon + ' ' + CatalogCss.star} style={{backgroundColor: "#FDD835"}}>★</h2>
                                </div>
                            </div>
                        </Fade>
                        <Fade right>
                            <div onClick={() => navigate(DISCOUNT_ROUTE)} className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                                <div className={CatalogCss.card}>
                                    <h2 className={CatalogCss.card_text}>Акции</h2>
                                    <h2 className={CatalogCss.card_icon} style={{backgroundColor: "#E41515"}}>%</h2>
                                </div>
                            </div>
                        </Fade>
                        <Fade right>
                            <div onClick={() => navigate(REPAIR_ROUTE)} className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                                <div className={CatalogCss.card}>
                                    <h2 className={CatalogCss.card_text}>Ремонт</h2>
                                    <h2 className={CatalogCss.card_icon} style={{backgroundColor: "#000"}}>🛠</h2>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>

            <Fade top>
                <FindLine len={12} />
            </Fade>

            <Filters currentScale={currentScale} updateScale={(value) => updateCurrentScale(value)} />

            <div className={CatalogCss.info_filter}>
                <div className="container">
                    <div className="row">
                        <div style={{display: "inline-block"}}
                             className="col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-1 col-sm-4 offset-sm-1 col-4 offset-1">
                            {item.currentBrand !== -1 ?
                                <h2 className={CatalogCss.info}>{currentBrandName}</h2>
                                :
                                <div/>
                            }
                        </div>
                        <div style={{display: "inline-block"}}
                             className="col-xxl-4 offset-xxl-4 col-xl-4 offset-xl-4 col-lg-4 offset-lg-4 col-md-6 offset-md-0 col-sm-6 offset-sm-0 col-6 offset-1">
                            {item.currentCategory !== -1 && item.currentDownCategory !== -1 ?
                                <h2 className={CatalogCss.info}>{currentCategoryName + ' ➜ ' + currentDownCategoryName}</h2>
                                :
                                <div>
                                    {item.currentCategory !== -1 ?
                                        <h2 className={CatalogCss.info}>
                                            {currentCategoryName}
                                        </h2>
                                        :
                                        <div/>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="items">
                <div className="container">
                    {items.length !== 0 ?
                        <div className="row">
                            {items.map(item =>
                                <Item key={item.id}
                                    name={item.name}
                                    id={item.id}
                                    image={item.img}
                                    price={item.price}
                                    oldPrice={item.old_price}
                                    discount={item.discount}
                                    discountFlag={item.discount_flag}
                                    availability={item.availability}
                                    updateMessage={(value) => updateMessage(value)}
                                    updateStart={(value) => updateStart(value)}
                                    updateStyle={(value) => updateStyle(value)}
                                />
                            )}
                        </div>
                        :
                        <Fade>
                            <div className="row">
                                <h2 className={CatalogCss.empty_text}>Пусто...</h2>
                            </div>
                        </Fade>
                    }
                </div>
            </div>


            <div className="container">
                <div className="row">
                    <div className={CatalogCss.page}>
                        <Page />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
});

export default Catalog;