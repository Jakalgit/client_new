import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {
    changeAvailability, changeHeight, changeImg1, changeImg2, changeImg3, changeImg4, changeInfo, changeLength,
    changeName, changeParams, changePrice, changeVisibility, changeWeight, changeWidth,
    fetchAllInfo,
    fetchBrands,
    fetchCategories,
    fetchDownCategories,
    fetchOneItem
} from "../../http/itemAPI";
import {Spinner} from "react-bootstrap";
import Alert from "../../components/Alert";
import ChangeItemCss from "../../css/admin/ChangeItem.module.css"
import {Context} from "../../index";
import Footer from "../../components/Footer";

const ChangeItem = () => {

    const {user} = useContext(Context)
    let role
    if (user.isAdmin) {
        role = 'ADMIN'
    } else {
        role = 'USER'
    }

    const {id} = useParams()
    const [item, setItem] = useState()

    const [start, setStart] = useState(false)
    const [message, setMessage] = useState('')
    const [style, setStyle] = useState('primary')

    const [loading, setLoading] = useState(true)

    const [categories, setCategories] = useState([])
    const [downCategories, setDownCategories] = useState([])
    const [brands, setBrands] = useState([])

    const [name,setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState(null)
    const [categoryDown, setCategoryDown] = useState(null)
    const [brand, setBrand] = useState(null)
    const [availability, setAvailability] = useState(true)
    const [visibility, setVisibility] = useState(false)
    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image3, setImage3] = useState(null)
    const [image4, setImage4] = useState(null)
    const [length, setLength] = useState('')
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [info, setInfo] = useState([])


    useEffect(() => {
        fetchOneItem(id).then(data => {
            setItem(data)
            setName(data.name)
            setPrice(data.price)
            setLength(data.length)
            setWidth(data.width)
            setHeight(data.height)
            setWeight(data.weight)

            setAvailability(data.availability)
            setVisibility(data.visibility)
            fetchAllInfo(data.id).then(data => {
                setInfo(data.rows)
            }).finally(() => {
                fetchCategories().then(data => {
                    setCategories(data)
                    fetchDownCategories().then(data => {
                        setDownCategories(data)
                        fetchBrands().then(data => {
                            setBrands(data)
                            setLoading(false)
                        })
                    })
                })
            })
        })
    }, [])

    useEffect(() => {
        if (start) {
            setTimeout(() => {
                setStart(false)
            }, 2500)
        }
    }, [start])

    const clickChangeName = () => {
        if (name) {
            changeName(role, name, id).then(() => {
                setStart(true)
                setMessage('Название изменено')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const clickChangePrice = () => {
        if (price) {
            changePrice(role, price, id).then(() => {
                setStart(true)
                setMessage('Цена изменена')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const clickChangeLength = () => {
        if (length) {
            changeLength(role, length, id).then((() => {
                setStart(true)
                setMessage('Длина изменена')
                setStyle('primary')
            }))
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const clickChangeWidth = () => {
        if (width) {
            changeWidth(role, width, id).then(() => {
                setStart(true)
                setMessage('Ширина изменена')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const clickChangeHeight = () => {
        if (height) {
            changeHeight(role, height, id).then(() => {
                setStart(true)
                setMessage('Высота изменена')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const clickChangeWeight = () => {
        if (weight) {
            changeWeight(role, weight, id).then(() => {
                setStart(true)
                setMessage('Вес изменена')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const clickChangeParams = () => {
        if (category && categoryDown && brand) {
            changeParams(role, category.id, categoryDown.id, brand.id, id).then(() => {
                setStart(true)
                setMessage('Параметры изменены')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const clickChangeAvailability = () => {
        changeAvailability(role, availability, id).then(() => {
            setStart(true)
            setMessage('Наличие изменено')
            setStyle('primary')
        })
    }

    const clickChangeVisibility = () => {
        changeVisibility(role, visibility, id).then(() => {
            setStart(true)
            setMessage('Видимость изменена')
            setStyle('primary')
        })
    }

    const clickChangeImg1 = () => {
        if (image1) {
            const formData = new FormData()
            formData.append('img1', image1)
            formData.append('id', `${id}`)
            changeImg1(role, formData).then(() => {
                setStart(true)
                setMessage('Изображение изменено')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const deleteImg1 = () => {
        setImage1(null)
    }

    const clickChangeImg2 = () => {
        if (image2) {
            const formData = new FormData()
            formData.append('img2', image2)
            formData.append('id', `${id}`)
            changeImg2(role, formData).then(() => {
                setStart(true)
                setMessage('Изображение изменено')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const deleteImg2 = () => {
        setImage2(null)
    }

    const clickChangeImg3 = () => {
        if (image3) {
            const formData = new FormData()
            formData.append('img3', image3)
            formData.append('id', `${id}`)
            changeImg3(role, formData).then(() => {
                setStart(true)
                setMessage('Изображение изменено')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const deleteImg3 = () => {
        setImage3(null)
    }

    const clickChangeImg4 = () => {
        if (image4) {
            const formData = new FormData()
            formData.append('img4', image4)
            formData.append('id', `${id}`)
            changeImg4(role, formData).then(() => {
                setStart(true)
                setMessage('Изображение изменено')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const deleteImg4 = () => {
        setImage4(null)
    }

    const clickChangeInfo = (id) => {
        const text = String(info[info.findIndex(el => el.id === id)].info)
        console.log(text)
        if (text) {
            changeInfo(role, text, id).then(data => {
                setStart(true)
                setMessage('Информация изменена')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const updateStart = (value) => {
        setStart(value)
    }

    if (loading) {
        return <Spinner animation={"grow"} />
    }

    return (
        <div>
            <Alert start={start} variant={style} text={message} updateStart={(value) => updateStart(value)}/>
            <div className={ChangeItemCss.name_price}>
                <div className="container">
                    <div className="row">
                        <input type="text"
                               value={name}
                               onChange={(e) => {setName(e.target.value)}}
                               className={ChangeItemCss.input + ' col-xxl-8 offset-xxl-0 col-xl-8 offset-xl-0 col-lg-8 offset-lg-0 col-md-8 offset-md-0 col-sm-8 offset-sm-0 col-6 offset-1'}
                               placeholder="Введите название"/>
                        <button onClick={clickChangeName}
                            className={ChangeItemCss.save + ' col-xxl-3 offset-xxl-1 col-xl-3 offset-xl-1 col-lg-3 offset-lg-1 col-md-3 offset-md-1 col-sm-3 offset-sm-1 col-3 offset-1'}>
                            Сохранить
                        </button>
                        <input type="number"
                               value={price}
                               onChange={(e) => {setPrice(e.target.value)}}
                               className={ChangeItemCss.input + ' col-xxl-8 offset-xxl-0 col-xl-8 offset-xl-0 col-lg-8 offset-lg-0 col-md-8 offset-md-0 col-sm-8 offset-sm-0 col-6 offset-1'}
                               placeholder="Введите цену"/>
                        <button onClick={clickChangePrice}
                            className={ChangeItemCss.save + ' col-xxl-3 offset-xxl-1 col-xl-3 offset-xl-1 col-lg-3 offset-lg-1 col-md-3 offset-md-1 col-sm-3 offset-sm-1 col-3 offset-1'}>
                            Сохранить
                        </button>
                    </div>
                </div>
            </div>

            <div className={ChangeItemCss.param_item}>
                <div className="container">
                    <div className="row">
                        <div className={ChangeItemCss.list_block + ' col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-10 offset-1'}>
                            <h2 className={ChangeItemCss.list_name}>Категория</h2>
                            <div className={ChangeItemCss.list}>
                                {categories.map(category =>
                                    <h2 onClick={() => setCategory(category)} className={ChangeItemCss.name}>{category.name}</h2>
                                )}
                            </div>
                            {category ?
                                <h2 className={ChangeItemCss.select_name}>{category.name}</h2>
                                :
                                <h2 className={ChangeItemCss.select_name}>Не выбрано</h2>
                            }
                        </div>
                        <div
                            className={ChangeItemCss.list_block + ' col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-10 offset-1'}>
                            <h2 className={ChangeItemCss.list_name}>Подкатегория</h2>
                            <div className={ChangeItemCss.list}>
                                {downCategories.map(downCategory =>
                                    <h2 onClick={() => setCategoryDown(downCategory)} className={ChangeItemCss.name}>{downCategory.name}</h2>
                                )}
                            </div>
                            {categoryDown ?
                                <h2 className={ChangeItemCss.select_name}>{categoryDown.name}</h2>
                                :
                                <h2 className={ChangeItemCss.select_name}>Не выбрано</h2>
                            }
                        </div>
                        <div
                            className={ChangeItemCss.list_block + ' col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-10 offset-1'}>
                            <h2 className={ChangeItemCss.list_name}>Бренд</h2>
                            <div className={ChangeItemCss.list}>
                                {brands.map(brand =>
                                    <h2 onClick={() => setBrand(brand)} className={ChangeItemCss.name}>{brand.name}</h2>
                                )}
                            </div>
                            {brand ?
                                <h2 className={ChangeItemCss.select_name}>{brand.name}</h2>
                                :
                                <h2 className={ChangeItemCss.select_name}>Не выбрано</h2>
                            }
                        </div>
                        <button onClick={clickChangeParams}
                            className={ChangeItemCss.save + ' col-xxl-4 offset-xxl-4 col-xl-4 offset-xl-4 col-lg-4 offset-lg-4 col-md-4 offset-md-4 col-sm-4 offset-sm-4 col-10 offset-1'}>Сохранить
                        </button>
                    </div>
                </div>
            </div>

            <div className={ChangeItemCss.radio_item}>
                <div className="container">
                    <div className="row">
                        <div className='left col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6'>
                            <div className={ChangeItemCss.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input onClick={() => setAvailability(true)} type="radio" className={ChangeItemCss.radio} name="stock" checked={availability}/>
                                <h2 className={ChangeItemCss.line_text}>В наличии</h2>
                            </div>
                            <div className={ChangeItemCss.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input onClick={() => setAvailability(false)} type="radio" className={ChangeItemCss.radio} name="stock" checked={!availability}/>
                                <h2 className={ChangeItemCss.line_text}>Нет в наличии</h2>
                            </div>
                            <button onClick={clickChangeAvailability}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Сохранить
                            </button>
                        </div>
                        <div
                            className='right col-xxl-4 offset-xxl-4 col-xl-4 offset-xl-4 col-lg-4 offset-lg-4 col-md-4 offset-md-4 col-sm-4 offset-sm-4 col-6'>
                            <div className={ChangeItemCss.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input onClick={() => setVisibility(true)} type="radio" className={ChangeItemCss.radio} name="visibility" checked={visibility}/>
                                <h2 className={ChangeItemCss.line_text}>Видимый</h2>
                            </div>
                            <div className={ChangeItemCss.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input onClick={() => setVisibility(false)} type="radio" className={ChangeItemCss.radio} name="visibility" checked={!visibility}/>
                                <h2 className={ChangeItemCss.line_text}>Невидимый</h2>
                            </div>
                            <button onClick={clickChangeVisibility}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={ChangeItemCss.images_item}>
                <div className="container">
                    <div className="row">
                        <div className={ChangeItemCss.img_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'}>
                            <button onClick={deleteImg1}
                                className={ChangeItemCss.delete + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Удалить
                            </button>
                            <label className={ChangeItemCss.input_file}>
                                <input type="file" className={ChangeItemCss.file} onChange={(e) => setImage1(e.target.files[0])}/>
                                <h2 className={ChangeItemCss.file_text}>Выберете изображение 1</h2>
                            </label>
                            <button onClick={clickChangeImg1}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Сохранить
                            </button>
                            <div className={ChangeItemCss.change}>
                                {image1 ?
                                    <img src={URL.createObjectURL(image1)} alt="" className={ChangeItemCss.change_image}/>
                                    :
                                    <div></div>
                                }
                            </div>
                        </div>
                        <div className={ChangeItemCss.img_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'}>
                            <button onClick={deleteImg2}
                                className={ChangeItemCss.delete + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Удалить
                            </button>
                            <label className={ChangeItemCss.input_file}>
                                <input type="file" className={ChangeItemCss.file} onChange={(e) => setImage2(e.target.files[0])}/>
                                <h2 className={ChangeItemCss.file_text}>Выберете изображение 2</h2>
                            </label>
                            <button onClick={clickChangeImg2}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Сохранить
                            </button>
                            <div className={ChangeItemCss.change}>
                                {image2 ?
                                    <img src={URL.createObjectURL(image2)} alt="" className={ChangeItemCss.change_image}/>
                                    :
                                    <div></div>
                                }
                            </div>
                        </div>
                        <div className={ChangeItemCss.img_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'}>
                            <button onClick={deleteImg3}
                                className={ChangeItemCss.delete + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Удалить
                            </button>
                            <label className={ChangeItemCss.input_file}>
                                <input type="file" className={ChangeItemCss.file} onChange={(e) => setImage3(e.target.files[0])}/>
                                <h2 className={ChangeItemCss.file_text}>Выберете изображение 3</h2>
                            </label>
                            <button onClick={clickChangeImg3}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Сохранить
                            </button>
                            <div className={ChangeItemCss.change}>
                                {image3 ?
                                    <img src={URL.createObjectURL(image3)} alt="" className={ChangeItemCss.change_image}/>
                                    :
                                    <div></div>
                                }
                            </div>
                        </div>
                        <div className={ChangeItemCss.img_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'}>
                            <button onClick={deleteImg4}
                                className={ChangeItemCss.delete + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Удалить
                            </button>
                            <label className={ChangeItemCss.input_file}>
                                <input type="file" className={ChangeItemCss.file} onChange={(e) => setImage4(e.target.files[0])}/>
                                <h2 className={ChangeItemCss.file_text}>Выберете изображение 4</h2>
                            </label>
                            <button onClick={clickChangeImg4}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Сохранить
                            </button>
                            <div className={ChangeItemCss.change}>
                                {image4 ?
                                    <img src={URL.createObjectURL(image4)} alt="" className={ChangeItemCss.change_image}/>
                                    :
                                    <div></div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={ChangeItemCss.name_price}>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                            <input type="number"
                                   value={length}
                                   onChange={(e) => setLength(e.target.value)}
                                   className={ChangeItemCss.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                   placeholder='Длина(см)'/>
                            <button onClick={clickChangeLength}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                Сохранить
                            </button>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                            <input type="number"
                                   value={width}
                                   onChange={(e) => setWidth(e.target.value)}
                                   className={ChangeItemCss.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                   placeholder='Ширина(см)'/>
                            <button onClick={clickChangeWidth}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                Сохранить
                            </button>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                            <input type="number"
                                   value={height}
                                   onChange={(e) => setHeight(e.target.value)}
                                   className={ChangeItemCss.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                   placeholder='Высота(см)'/>
                            <button onClick={clickChangeHeight}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                Сохранить
                            </button>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                            <input type="number"
                                   value={weight}
                                   onChange={(e) => setWeight(e.target.value)}
                                   className={ChangeItemCss.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                   placeholder='Вес(кг)'/>
                            <button onClick={clickChangeWeight}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={ChangeItemCss.description_block}>
                <div className="container">
                    <div className="row">
                        {info.map(i =>
                            <div className="description">
                                <textarea className={ChangeItemCss.des_text + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                    value={i.info}
                                    onChange={(e) => {
                                        const index = info.findIndex(el => el.id === i.id)
                                        setInfo(prevState => {
                                            const newState = [...prevState]
                                            newState[index].info = e.target.value
                                            return newState
                                        })
                                    }}
                                    placeholder="Введите описание"/>
                                <button onClick={() => clickChangeInfo(i.id)} className={ChangeItemCss.save + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-4'}>Сохранить</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ChangeItem;