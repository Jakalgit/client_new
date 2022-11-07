import React, {useContext, useEffect, useState} from 'react';
import Footer from "../components/Footer";
import {Context} from "../index";
import {Link, useNavigate} from "react-router-dom";
import {CATALOG_ROUTE, DISCOUNT_ROUTE, FIND_ROUTE, NEW_ROUTE, POPULAR_ROUTE, REPAIR_ROUTE} from "../utils/consts";
import HomeCss from "../css/Home.module.css"
import {fetchCategories} from "../http/API/categoryAPI";
import {fetchDownCategories} from "../http/API/downCategoryAPI"
import {Carousel, Spinner} from "react-bootstrap";
import Fade from "react-reveal/Fade";
import general from "../css/General.module.css";
import FindLine from "../components/FindLine";

const Home = () => {

    document.title = 'Добро пожаловать!'

    const {item} = useContext(Context)
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)

    const [categories, setCategories] = useState([])
    const [downCategories, setDownCategories] = useState([])

    useEffect(() => {
        fetchCategories().then(data => {
            setCategories(data)
            fetchDownCategories().then(data => {
                setDownCategories(data)
                setLoading(false)
            })
        })
    }, [])

    const clickItem = (name_downCategory) => {
        let categoryId, downCategoryId
        categories.forEach(category =>{
            if (category.name === "Автомодели") {
                categoryId = category.id
            }
        })
        downCategories.forEach(downCategory => {
            if (downCategory.name === name_downCategory) {
                downCategoryId = downCategory.id
            }
        })
        item.setCurrentCategory(categoryId)
        item.setCurrentDownCategory(downCategoryId)
        navigate(CATALOG_ROUTE)
    }

    if (loading) {
        return (
            <div className={general.loading}>
                <Spinner animation="border" variant="secondary" />
            </div>
        )
    }

    return (
        <div style={{marginTop: "6rem"}}>
            <Fade top>
                <FindLine len={10} />
            </Fade>
            <Fade>
                <Carousel variant={'dark'}>
                    <Carousel.Item>
                        <div className={HomeCss.carousel_block}>
                            <h1 className={HomeCss.welcome_text}>
                                Добро пожаловать!
                            </h1>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div onClick={() => navigate(DISCOUNT_ROUTE)}
                             className={HomeCss.carousel_block + ' ' + HomeCss.hover}>
                            <h1 className={HomeCss.welcome_text}>
                                Акции
                            </h1>
                            <h1 className={HomeCss.discount}>%</h1>
                        </div>
                        <Carousel.Caption>
                            <p className={HomeCss.prompt}>Нажмите чтобы посмотреть</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div onClick={() => navigate(NEW_ROUTE)}
                             className={HomeCss.carousel_block + ' ' + HomeCss.hover}>
                            <h1 className={HomeCss.welcome_text}>
                                Новинки
                            </h1>
                            <h1 style={{backgroundColor: "#00E5FF"}} className={HomeCss.discount + ' ' + HomeCss.new}>new</h1>
                        </div>
                        <Carousel.Caption>
                            <p className={HomeCss.prompt}>Нажмите чтобы посмотреть</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div onClick={() => navigate(POPULAR_ROUTE)}
                             className={HomeCss.carousel_block + ' ' + HomeCss.hover}>
                            <h1 className={HomeCss.welcome_text}>
                                Популярное
                            </h1>
                            <h1 style={{backgroundColor: "#FDD835"}} className={HomeCss.discount}>★</h1>
                        </div>
                        <Carousel.Caption>
                            <p className={HomeCss.prompt}>Нажмите чтобы посмотреть</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div onClick={() => navigate(REPAIR_ROUTE)} className={HomeCss.carousel_block + ' ' + HomeCss.hover}>
                            <h1 className={HomeCss.welcome_text}>
                                Ремонт
                            </h1>
                            <h1 style={{backgroundColor: "#000"}} className={HomeCss.discount}>🛠</h1>
                        </div>
                        <Carousel.Caption>
                            <p className={HomeCss.prompt}>Нажмите чтобы посмотреть</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Fade>

            <Fade bottom>
                <div className={HomeCss.block_model}>
                    <div className="container">
                        <div className="row">
                            <div className={HomeCss.img_div + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'}>
                                <img src={require("../img/image/xmax.jpg")} alt="" className={HomeCss.image}/>
                                <button onClick={() => {clickItem('Монстр-трак')}} className={HomeCss.check}>Посмотреть</button>
                            </div>
                            <div className={HomeCss.des_text + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'}>
                                <h1 className={HomeCss.head_text + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Монстр-трак</h1>
                                <h2 className={HomeCss.down_text + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>Радиоуправляемые
                                    машины класса «монстр», благодаря большому дорожному просвету, широким колесам и прочной
                                    подвеске идеально подходят для скоростной езды по бездорожью и прыжкам на
                                    трамплинах.</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>

            <Fade bottom>
                <div className={HomeCss.block_model}>
                    <div className="container">
                        <div className="row">
                            <div className={HomeCss.des_text + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'}>
                                <h1 className={HomeCss.head_text + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Трагги</h1>
                                <h2 className={HomeCss.down_text + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>Радиоуправляемые
                                    машины класса «трагги» - это наиболее универсальные внедорожники. На них одинаково
                                    эффектно можно пройти вираж, взлететь на трамплине, и «пронестись» по ухабам на
                                    сумасшедшей скорости!</h2>
                            </div>
                            <div className={HomeCss.img_div + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'}>
                                <img src={require("../img/image/kraton.jpg")} alt="" className={HomeCss.image}/>
                                <button onClick={() => {clickItem('Трагги')}} className={HomeCss.check}>Посмотреть</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>

            <Fade bottom>
                <div className={HomeCss.block_model}>
                    <div className="container">
                        <div className="row">
                            <div className={HomeCss.img_div + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'}>
                                <img src={require("../img/image/blitz.jpg")} alt="" className={HomeCss.image}/>
                                <button onClick={() => {clickItem('Шорт-корс')}} className={HomeCss.check}>Посмотреть</button>
                            </div>
                            <div className={HomeCss.des_text + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'}>
                                <h1 className={HomeCss.head_text + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Шорт-корс</h1>
                                <h2 className={HomeCss.down_text + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>Автомодели
                                    класса «шорт-корс» это большая мощность, великолепная устойчивость и внушительный
                                    внешний вид. Такое сочетание безусловно не оставит равнодушным автомоделиста.</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>

            <Fade bottom>
                <div className={HomeCss.block_model}>
                    <div className="container">
                        <div className="row">
                            <div className={HomeCss.des_text + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'}>
                                <h1 className={HomeCss.head_text + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Багги</h1>
                                <h2 className={HomeCss.down_text + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>Радиоуправляемые
                                    багги отличаются от своих прототипов только размером. Абсолютно идентичные конструкции
                                    позволяют перемещаться по любому бездорожью, а красивые лексановсые корпуса отлично
                                    защищают все внутренние детали.</h2>
                            </div>
                            <div className={HomeCss.img_div + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'}>
                                <img src={require("../img/image/baja.jpg")} alt="" className={HomeCss.image}/>
                                <button onClick={() => {clickItem('Багги')}} className={HomeCss.check}>Посмотреть</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>

            <Fade bottom>
                <div className={HomeCss.block_model}>
                    <div className="container">
                        <div className="row">
                            <div className={HomeCss.img_div + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'}>
                                <img src={require("../img/image/felony.jpg")} alt="" className={HomeCss.image}/>
                                <button onClick={() => {clickItem('Шоссейные')}} className={HomeCss.check}>Посмотреть</button>
                            </div>
                            <div className={HomeCss.des_text + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'}>
                                <h1 className={HomeCss.head_text + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Шоссейные</h1>
                                <h2 className={HomeCss.down_text + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>Этот
                                    класс радиоуправляемых машин предназначен для настоящих экстремально быстрых гонок.
                                    Отличная управляемость, «копийность» модели – именно то, что нужно, если Вы хотите
                                    почувствовать себя настоящим пилотом на серьёзном гоночном каре.</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>

            <Fade bottom>
                <div className={HomeCss.block_model}>
                    <div className="container">
                        <div className="row">
                            <div className={HomeCss.des_text + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'}>
                                <h1 className={HomeCss.head_text + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Ралли</h1>
                                <h2 className={HomeCss.down_text + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>Раллийные
                                    модели на радиоуправлении – это машины, предназначенные для стремительных заездов и
                                    адреналиновых виражей не только по асфальту, но и по грунтовке.</h2>
                            </div>
                            <div className={HomeCss.img_div + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'}>
                                <img src={require("../img/image/nos.jpg")} alt="" className={HomeCss.image}/>
                                <button onClick={() => {clickItem('Ралли')}} className={HomeCss.check}>Посмотреть</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>

            <div className="container">
                <div className="row">
                    <Fade left>
                        <h2 className={HomeCss.text_catalog + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Весь
                            ассортимент товаров вы можете посмотреть в <Link to="/catalog"><p className={HomeCss.href}>каталоге</p></Link></h2>
                    </Fade>
                    <Fade right>
                        <h2 className={HomeCss.phone_number + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>+7(985)-340-26-36</h2>
                    </Fade>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;