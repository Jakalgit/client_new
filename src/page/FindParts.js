import React, {useContext, useState} from 'react';
import Footer from "../components/Footer";
import PartsCss from "../css/FindParts.module.css"
import {FIND_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";

const FindParts = () => {

    const {user} = useContext(Context)
    const navigate = useNavigate()

    const [searchValue, setSearchValue] = useState('')

    const searchClick = () => {

        if (searchValue) {
            user.setSearchValue(searchValue)
            navigate(FIND_ROUTE)
        } else {
            //setModalText('Введите текст в строку')
            //setShowModal(true)
        }

    }

    return (
        <div>
            <div className={PartsCss.find_block}>
                <div className="container">
                    <div className="row">
                        <div className={PartsCss.find_line + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}>
                            <div className="row">
                                <input type="text" className={PartsCss.search + ' col-xxl-9 col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9'}
                                    value={searchValue}
                                    onChange={event => setSearchValue(event.target.value)}
                                    placeholder="Поиск товаров..."
                                />
                                <button onClick={searchClick} className={PartsCss.find + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3'}>Найти</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={PartsCss.section_text}>
                <div className="container">
                    <div className="row">
                        <h1 className={PartsCss.find_parts_text + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Поиск
                            запчастей</h1>
                    </div>
                </div>
            </div>

            <div className={PartsCss.section_color}>
                <div className="container">
                    <div className="row">
                        <div className={PartsCss.help_bar + ' ' + PartsCss.type_bar + ' col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4'}>
                            <div className={PartsCss.bar + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                <h2 className={PartsCss.name_bar + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Тип</h2>
                            </div>
                            <div className={PartsCss.dropdown_list + ' ' + PartsCss.type_list + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                <button className={PartsCss.bar_list_item + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Самолёты</button>
                            </div>
                        </div>
                        <div className={PartsCss.help_bar + ' ' + PartsCss.brand_bar + ' col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4'}>
                            <div className={PartsCss.bar + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                <h2 className={PartsCss.name_bar + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Бренд</h2>
                            </div>
                            <div className={PartsCss.dropdown_list + ' ' + PartsCss.brand_list + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>

                            </div>
                        </div>
                        <div className={PartsCss.help_bar + ' ' + PartsCss.model_bar + ' col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4'}>
                            <div className={PartsCss.bar + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                <h2 className={PartsCss.name_bar + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Модель</h2>
                            </div>
                            <div className={PartsCss.dropdown_list + ' ' + PartsCss.brand_list + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-item">
                <div className="container">
                    <div className="row">
                        <h1 className="empty-text col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">Пусто...</h1>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default FindParts;