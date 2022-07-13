import React, {useContext, useEffect, useState} from 'react';
import Filters from "../components/Filters";
import CatalogCss from '../css/Catalog.module.css'
import Item from '../components/Item'
import {Context} from "../index";
import Footer from "../components/Footer";
import {observer} from "mobx-react-lite";
import {fetchBrands, fetchDownCategories, fetchCategories, fetchItems, initBasket} from "../http/itemAPI";
import Page from "../components/Page";
import Alert from "../components/Alert";
import {Spinner} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import {FIND_ROUTE} from "../utils/consts";
import "../css/components/Alert.css"
import {Helmet} from "react-helmet";

const Catalog = observer(() => {

    const {item} = useContext(Context)
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)

    const [currentCategoryName, setCurrentCategoryName] = useState('')
    const [currentDownCategoryName, setCurrentDownCategoryName] = useState('')
    const [currentBrandName, setCurrentBrandName] = useState('')

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
                    fetchDownCategories().then(data => {
                        item.setDownCategories(data)
                        fetchBrands().then(data => {
                            item.setBrands(data)
                            fetchBrands().then(data => {
                                item.setBrands(data)
                                fetchItems(null, null, null,1, true).then(data => {
                                    item.setItems(data.rows)
                                    item.setTotalCount(data.count)
                                })
                            })
                        })
                    })
                })
            })
        })
        setLoading(false)
    }, [])

    useEffect(() => {
        fetchItems(item.currentCategory === -1 ? null : item.currentCategory,
            item.currentDownCategory === -1 ? null : item.currentDownCategory,
            item.currentBrand === -1 ? null : item.currentBrand, !item.currentAvailability, true,
            item.page).then(data => {
            item.setItems(data.rows)
            item.setTotalCount(data.count)

            findNameDownCategoryById()
            findNameCategoryById()
            findNameBrandById()
        })
    }, [item.page, item.currentCategory, item.currentDownCategory, item.currentBrand, item.currentAvailability])

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

    const searchClick = () => {

        if (searchValue) {
            user.setSearchValue(searchValue)
            navigate(FIND_ROUTE)
        } else {
            //setModalText('Введите текст в строку')
            //setShowModal(true)
        }

    }

    const findNameCategoryById = () => {
        if (item.currentCategory !== -1) {
            console.log(item.categories)
            item.categories.map(category => {
                if (category.id === item.currentCategory) {
                    setCurrentCategoryName(category.name)
                }
            })
        }
    }

    const findNameDownCategoryById = () => {
        if (item.currentDownCategory !== -1) {
            console.log(item.downCategories)
            item.downCategories.map(downCategory => {
                if (downCategory.id === item.currentDownCategory) {
                    setCurrentDownCategoryName(downCategory.name)
                }
            })
        }
    }

    const findNameBrandById = () => {
        if (item.currentBrand !== -1) {
            item.brands.map(brand => {
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

    if (loading) {
        return <Spinner animation={"grow"} className={CatalogCss.spinner} />
    }

    return (

        <div>
            <Alert start={start} variant={style} text={message} updateStart={(value) => updateStart(value)}/>
            <div className={CatalogCss.find_block}>
                <div className="container">
                    <div className="row">
                        <div className={CatalogCss.find_line + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}>
                            <div className="row">
                                <input type="text" className={CatalogCss.search + ' col-xxl-9 col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9'} placeholder="Поиск товаров..."
                                    value={searchValue}
                                    onChange={event => setSearchValue(event.target.value)}
                                />
                                <button onClick={searchClick} className={CatalogCss.find + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3'}>Найти</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Filters />

            <div className={CatalogCss.info_filter}>
                <div className="container">
                    <div className="row">
                        {item.currentCategory !== -1 && item.currentDownCategory !== -1 ?
                            <h2 className={CatalogCss.info + ' col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6'}>{currentCategoryName + ' > ' + currentDownCategoryName}</h2>
                            :
                            item.currentCategory !== -1 ?
                                <h2 className={CatalogCss.info + ' col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6'}>{currentCategoryName}</h2>
                                :
                                <div></div>
                        }
                        {item.currentBrand !== -1 ?
                            <h2 className={CatalogCss.info + ' col-xxl-4 offset-xxl-4 col-xl-4 offset-xl-4 col-lg-4 offset-lg-4 col-md-4 offset-md-2 col-sm-4 offset-sm-2 col-4 offset-2'}>
                                {currentBrandName}</h2>
                            :
                            <div></div>
                        }
                    </div>
                </div>
            </div>

            <div className="items">
                <div className="container">
                    {item.items.length !== 0 ?
                        <div className="row">
                            {item.items.map(item =>
                                <Item name={item.name}
                                      id={item.id}
                                      price={item.price}
                                      image={item.img1}
                                      availability={item.availability}
                                      updateMessage={(value) => updateMessage(value)}
                                      updateStart={(value) => updateStart(value)}
                                      updateStyle={(value) => updateStyle(value)}
                                />
                            )}
                        </div>
                        :
                        <div className="row">
                            <h2 className={CatalogCss.empty_text}>Пусто...</h2>
                        </div>
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