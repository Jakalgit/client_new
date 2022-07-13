import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Row} from "react-bootstrap";
import FiltersCss from '../css/components/Filters.module.css'
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Filters = observer(() => {

    const {item} = useContext(Context)

    const [drawCategories, setDrawCategories] = useState([])
    const [currentCategoryId, setCategoryId] = useState(item.currentCategory)

    useEffect(() => {
        drawCategory()
    }, [currentCategoryId])

    const drawCategory = () => {

        setDrawCategories([])

        console.log(item.downCategories)

        if (item.downCategories && currentCategoryId !== -1) {
            let mas = []
            item.downCategories.map(downCategory => {
                if (downCategory.categoryId === currentCategoryId ) {
                    mas.push(downCategory)
                }
            })
            setDrawCategories(mas)
        }
    }

    const changeCurrentAvailability = () => {
        if (item.currentAvailability) {
            item.setCurrentAvailability(false)
        } else {
            item.setCurrentAvailability(true)
        }
    }

    return (
        <div className={FiltersCss.filters}>
            <div className="container">
                <div className="row">
                    <div className={FiltersCss.up_line}>
                        <h2 className={FiltersCss.filters_text + ' col-xxl-2 offset-xxl-5 col-xl-2 offset-xl-5 col-lg-2 offset-lg-5 col-md-4 offset-md-4 col-sm-4 offset-sm-4 col-4 offset-4'}>Фильтры</h2>
                        <button className={FiltersCss.clean} onClick={() => {
                            item.setCurrentCategory(-1)
                            item.setCurrentDownCategory(-1)
                            item.setCurrentBrand(-1)
                            setCategoryId(-1)
                            setDrawCategories([])
                        }}>
                            <img src={require('../img/x_black.svg')} alt="" className={FiltersCss.clean_img}/>
                        </button>
                    </div>
                    <div className={FiltersCss.availability}>
                        <input type="checkbox" className={FiltersCss.checkbox} onClick={changeCurrentAvailability} checked={item.currentAvailability}/>
                        <h2 className={FiltersCss.checkbox_text}>Товары которых нет в наличии</h2>
                    </div>
                    <div className={FiltersCss.help_bar + ' ' + FiltersCss.type_bar + ' col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4'}>
                        <div className={FiltersCss.bar + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                            <h2 className={FiltersCss.name_bar + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Категория</h2>
                        </div>
                        <div className={FiltersCss.dropdown_list + ' ' + FiltersCss.type_list + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                            {item.categories.map(category =>
                                <button className={FiltersCss.bar_list_item + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                        onClick={(e) => {
                                            item.setCurrentCategory(category.id)
                                            setCategoryId(category.id)
                                        }}>
                                    {category.name}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className={FiltersCss.help_bar + ' ' + FiltersCss.brand_bar + ' col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4'}>
                        <div className={FiltersCss.bar + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                            <h2 className={FiltersCss.name_bar + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Подкатегория</h2>
                        </div>
                        <div className={FiltersCss.dropdown_list + ' ' + FiltersCss.brand_list + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                            {drawCategories.map(categoryDown =>
                                <button className={FiltersCss.bar_list_item + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                        onClick={() => {item.setCurrentDownCategory(categoryDown.id)
                                        }}>
                                    {categoryDown.name}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className={FiltersCss.help_bar + ' ' + FiltersCss.model_bar + ' col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4'}>
                        <div className={FiltersCss.bar + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                            <h2 className={FiltersCss.name_bar + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Бренд</h2>
                        </div>
                        <div className={FiltersCss.dropdown_list + ' ' + FiltersCss.model_list + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                            {item.brands.map(brand =>
                                <button className={FiltersCss.bar_list_item + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                     onClick={() => {item.setCurrentBrand(brand.id)}
                                }>
                                    {brand.name}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Filters;