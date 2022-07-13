import React, {useContext, useEffect, useState} from 'react';
import CreateItemCss from '../../css/admin/CreateItem.module.css'
import {Context} from "../../index";
import {createItem, createItemInfo, fetchBrands, fetchCategories, fetchDownCategories} from "../../http/itemAPI";
import data from "bootstrap/js/src/dom/data";
import {Button, Row, Spinner} from "react-bootstrap";
import ModalWindow from "../../components/ModalWindow";
import Footer from "../../components/Footer";
import {observer} from "mobx-react-lite";

const CreateItem = observer(() => {

    const {item} = useContext(Context)

    const [loading, setLoading] = useState(true)

    const [currentCategory, setCurrentCategory] = useState(-1)
    const [currentBrand, setCurrentBrand] = useState(-1)
    const [currentDownCategory, setCurrentDownCategory] = useState(-1)
    const [nameItem, setNameItem] = useState('')
    const [priceItem, setPriceItem] = useState('')
    const [imgItem_1, setImgItem_1] = useState(null)
    const [imgItem_2, setImgItem_2] = useState(null)
    const [imgItem_3, setImgItem_3] = useState(null)
    const [imgItem_4, setImgItem_4] = useState(null)
    const [length, setLength] = useState('')
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [availability, setAvailability] = useState(true)
    const [visibility, setVisibility] = useState(true)

    const [info, setInfo] = useState([])

    const [showModal, setShowModal] = useState(false)
    const [modalText, setModalText] = useState('')

    const [drawCategories, setDrawCategories] = useState([])

    useEffect(() => {
        fetchCategories().then(data => {
            item.setCategories(data)
            fetchDownCategories().then(data => {
                item.setDownCategories(data)
                fetchBrands().then(data => {
                    item.setBrands(data)
                    setLoading(false)
                })
            })
        })
    }, [])

    useEffect(() => {
        drawCategory()
    }, [currentCategory])

    const {user} = useContext(Context)
    let role
    if (user.isAdmin) {
        role = 'ADMIN'
    } else {
        role = 'USER'
    }

    const addInfo = () => {
        setInfo([...info, {info: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const selectImg_1 = (e) => {
        setImgItem_1(e.target.files[0])
    }

    const removeImg_1 = () => {
        setImgItem_1(null)
    }

    const selectImg_2 = (e) => {
        setImgItem_2(e.target.files[0])
    }

    const removeImg_2 = () => {
        setImgItem_2(null)
    }

    const selectImg_3 = (e) => {
        setImgItem_3(e.target.files[0])
    }

    const removeImg_3 = () => {
        setImgItem_3(null)
    }

    const selectImg_4 = (e) => {
        setImgItem_4(e.target.files[0])
    }

    const removeImg_4 = () => {
        setImgItem_4(null)
    }

    const changeInfo = (value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, 'info' : value} : i))
        console.log(info)
    }

    const addItem = () => {
        if ((currentCategory !== -1) && (currentDownCategory !== -1) && (currentBrand !== -1) && nameItem && info && length &&
            width && height && weight && priceItem && imgItem_1 && imgItem_2 && imgItem_3 && imgItem_4) {
            const formData = new FormData()
            formData.append('name', nameItem)
            formData.append('price', priceItem)
            formData.append('img_1', imgItem_1)
            formData.append('img_2', imgItem_2)
            formData.append('img_3', imgItem_3)
            formData.append('img_4', imgItem_4)
            formData.append('categoryId', `${currentCategory}`)
            formData.append('categoryDownId', `${currentDownCategory}`)
            formData.append('brandId', `${currentBrand}`)
            formData.append('length', `${length}`)
            formData.append('width', `${width}`)
            formData.append('height', `${height}`)
            formData.append('weight', `${weight}`)
            formData.append('availability', `${availability}`)
            formData.append('visibility', `${visibility}`)
            createItem({formData, role}).then(data => {
                setPriceItem('')
                setNameItem('')
                setLength('')
                setWidth('')
                setHeight('')
                setWeight('')
                info.map(i => {
                    createItemInfo(role, i.info, data.id).then(() => {})
                })
                setInfo([])
            }).finally(() => {
                setModalText('Товар добавлен')
                setShowModal(true)
            })
        } else {
            setModalText('Заполните все поля')
            setShowModal(true)
        }
    }

    const drawCategory = () => {

        setDrawCategories([])

        if (item.downCategories && currentCategory !== -1) {
            let mas = []
            item.downCategories.map(downCategory => {
                if (downCategory.categoryId === currentCategory ) {
                    mas.push(downCategory)
                }
            })
            setDrawCategories(mas)
        }
    }

    if (loading) {
        return <Spinner className={CreateItemCss.empty} animation={"grow"} />
    }

    return (
        <section className={CreateItemCss.item_section + ' item-section'}>
            <div className="container">
                <div className="row">
                    <div className={CreateItemCss.create_item + ' create-item'}>
                        <div className="row">
                            <div className="block current-category col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-8 offset-2">
                                <h2 className={CreateItemCss.current_txt+ ' current-txt'}>Категории</h2>
                                <div className={CreateItemCss.current_block + ' current-block col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                    <Row>
                                        {item.categories.map(category =>
                                            <button className={CreateItemCss.select_item + ' select-item col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} key={category.id}
                                                    onClick={() => setCurrentCategory(category.id)}>
                                                {category.name}
                                            </button>
                                        )}
                                    </Row>
                                </div>
                            </div>
                            <div className="block current-downcategory col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-8 offset-2">
                                <h2 className={CreateItemCss.current_txt + ' current-txt'}>Подкатегории</h2>
                                <div className={CreateItemCss.current_block + ' current-block col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                    {drawCategories.map(downCategory =>
                                        <button className={CreateItemCss.select_item + ' select-item col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} key={downCategory.id}
                                            onClick={() => setCurrentDownCategory(downCategory.id)}>
                                            {downCategory.name}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="block current-brand col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-8 offset-2">
                                <h2 className={CreateItemCss.current_txt + ' current-txt'}>Бренды</h2>
                                <div className={CreateItemCss.current_block + ' current-block col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                    {item.brands.map(brand =>
                                        <button className={CreateItemCss.select_item+ ' select-item col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} key={brand.id}
                                            onClick={() => setCurrentBrand(brand.id)}>
                                            {brand.name}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-8 offset-2">
                                <input type="text" className={CreateItemCss.input_name + ' input-name col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} placeholder="Введите название"
                                       value={nameItem} onChange={e => setNameItem(e.target.value)}/>
                            </div>
                            <div className="col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-8 offset-2">
                                <input type="number" className={CreateItemCss.input_price + ' input-price col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} placeholder="Введите цену (руб.)"
                                       value={priceItem} onChange={e => setPriceItem(e.target.value)}/>
                            </div>
                            <div className={CreateItemCss.availability + ' availability col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-8 offset-2'}>
                                <div className="row">
                                    <div className={CreateItemCss.ava + ' left-ava col-xxl-11 offset-xxl-1 col-xl-11 offset-xl-1 col-lg-6 offset-lg-1 col-md-11 offset-md-1 col-sm-11 offset-sm-1 col-8 offset-2'}>
                                        <input type="radio" name="availability" className={CreateItemCss.radio_ava}
                                               onClick={() => {
                                                   setAvailability(true)
                                               }} checked={availability} />
                                        <h2 className={CreateItemCss.radio_text+ ' true-text radio-text col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10'}>
                                            В наличии
                                        </h2>
                                    </div>
                                    <div className={CreateItemCss.ava + ' right-ava col-xxl-11 offset-xxl-1 col-xl-11 offset-xl-1 col-lg-7 offset-lg-1 col-md-11 offset-md-1 col-sm-11 offset-sm-1 col-8 offset-2'}>
                                        <input type="radio" name="availability" className={CreateItemCss.radio_ava}
                                               onClick={() => {
                                                   setAvailability(false)
                                               }} checked={!availability}/>
                                        <h2 className={CreateItemCss.radio_text + ' false-text radio-text col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10'}>
                                            Нет в наличии
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-3 offset-xxl-0 col-xl-3 offset-xl-0 col-lg-3 offset-lg-0 col-md-3 offset-sm-0 col-sm-6 offset-sm-0 col-8 offset-2">
                                <Button onClick={removeImg_1}
                                    variant={"outline-danger"} className={CreateItemCss.remove_img + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Удалить</Button>
                                <label className={CreateItemCss.label_img + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                    <input type="file" className={CreateItemCss.input_img + ' input-img'} onChange={e => {selectImg_1(e)}}/>
                                    <h2 className={CreateItemCss.label_txt + ' label-txt'}>Выбрете изображение 1</h2>
                                </label>
                                <div className={CreateItemCss.image_name}>
                                    {imgItem_1 !== null ?
                                        <h2 className={CreateItemCss.img_name}>{imgItem_1.name}</h2>
                                        :
                                        <div/>
                                    }
                                </div>
                            </div>
                            <div className="col-xxl-3 offset-xxl-0 col-xl-3 offset-xl-0 col-lg-3 offset-lg-0 col-md-3 offset-sm-0 col-sm-6 offset-sm-0 col-8 offset-2">
                                <Button onClick={removeImg_2}
                                    variant={"outline-danger"} className={CreateItemCss.remove_img + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Удалить</Button>
                                <label className={CreateItemCss.label_img + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                    <input type="file" className={CreateItemCss.input_img + ' input-img'} onChange={e => {selectImg_2(e)}}/>
                                    <h2 className={CreateItemCss.label_txt + ' label-txt'}>Выбрете изображение 2</h2>
                                </label>
                                <div className={CreateItemCss.image_name}>
                                    {imgItem_2 !== null ?
                                        <h2 className={CreateItemCss.img_name}>{imgItem_2.name}</h2>
                                        :
                                        <div/>
                                    }
                                </div>
                            </div>
                            <div className="col-xxl-3 offset-xxl-0 col-xl-3 offset-xl-0 col-lg-3 offset-lg-0 col-md-3 offset-sm-0 col-sm-6 offset-sm-0 col-8 offset-2">
                                <Button onClick={removeImg_3}
                                    variant={"outline-danger"} className={CreateItemCss.remove_img + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Удалить</Button>
                                <label className={CreateItemCss.label_img + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                    <input type="file" className={CreateItemCss.input_img + ' input-img'} onChange={e => {selectImg_3(e)}}/>
                                    <h2 className={CreateItemCss.label_txt + ' label-txt'}>Выбрете изображение 3</h2>
                                </label>
                                <div className={CreateItemCss.image_name}>
                                    {imgItem_3 !== null ?
                                        <h2 className={CreateItemCss.img_name}>{imgItem_3.name}</h2>
                                        :
                                        <div/>
                                    }
                                </div>
                            </div>
                            <div className="col-xxl-3 offset-xxl-0 col-xl-3 offset-xl-0 col-lg-3 offset-lg-0 col-md-3 offset-sm-0 col-sm-6 offset-sm-0 col-8 offset-2">
                                <Button onClick={removeImg_4}
                                    variant={"outline-danger"} className={CreateItemCss.remove_img + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Удалить</Button>
                                <label className={CreateItemCss.label_img + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                    <input type="file" className={CreateItemCss.input_img + ' input-img'} onChange={e => {selectImg_4(e)}}/>
                                    <h2 className={CreateItemCss.label_txt + ' label-txt'}>Выбрете изображение 4</h2>
                                </label>
                                <div className={CreateItemCss.image_name}>
                                    {imgItem_4 !== null ?
                                        <h2 className={CreateItemCss.img_name}>{imgItem_4.name}</h2>
                                        :
                                        <div/>
                                    }
                                </div>
                            </div>
                            <div className={CreateItemCss.availability + ' availability col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-8 offset-2'}>
                                <div className="row">
                                    <div className={CreateItemCss.ava + ' left-ava col-xxl-11 offset-xxl-1 col-xl-11 offset-xl-1 col-lg-6 offset-lg-1 col-md-11 offset-md-1 col-sm-11 offset-sm-1 col-8 offset-2'}>
                                        <input type="radio" name="visibility" className={CreateItemCss.radio_ava}
                                               onClick={() => {
                                                   setVisibility(true)
                                               }} checked={visibility}/>
                                        <h2 className={CreateItemCss.radio_text+ ' true-text radio-text col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10'}>
                                            Видимый
                                        </h2>
                                    </div>
                                    <div className={CreateItemCss.ava + ' right-ava col-xxl-11 offset-xxl-1 col-xl-11 offset-xl-1 col-lg-7 offset-lg-1 col-md-11 offset-md-1 col-sm-11 offset-sm-1 col-8 offset-2'}>
                                        <input type="radio" name="visibility" className={CreateItemCss.radio_ava}
                                               onClick={() => {
                                                   setVisibility(false)
                                               }} checked={!visibility}/>
                                        <h2 className={CreateItemCss.radio_text + ' false-text radio-text col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10'}>
                                            Невидимый
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-3 offset-xxl-0 col-xl-3 offset-xl-0 col-lg-3 offset-lg-0 col-md-3 offset-md-0 col-sm-3 offset-sm-0 col-8 offset-2">
                                <input type="text" className={CreateItemCss.input_name + ' input-name col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} placeholder="Длина(см)"
                                       value={length} onChange={e => setLength(e.target.value)}/>
                            </div>
                            <div className="col-xxl-3 offset-xxl-0 col-xl-3 offset-xl-0 col-lg-3 offset-lg-0 col-md-3 offset-md-0 col-sm-3 offset-sm-0 col-8 offset-2">
                                <input type="text" className={CreateItemCss.input_name + ' input-name col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} placeholder="Ширина(см)"
                                       value={width} onChange={e => setWidth(e.target.value)}/>
                            </div>
                            <div className="col-xxl-3 offset-xxl-0 col-xl-3 offset-xl-0 col-lg-3 offset-lg-0 col-md-3 offset-md-0 col-sm-3 offset-sm-0 col-8 offset-2">
                                <input type="text" className={CreateItemCss.input_name + ' input-name col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} placeholder="Высота(см)"
                                       value={height} onChange={e => setHeight(e.target.value)}/>
                            </div>
                            <div className="col-xxl-3 offset-xxl-0 col-xl-3 offset-xl-0 col-lg-3 offset-lg-0 col-md-3 offset-md-0 col-sm-3 offset-sm-0 col-8 offset-2">
                                <input type="text" className={CreateItemCss.input_name + ' input-name col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} placeholder="Вес(кг)"
                                       value={weight} onChange={e => setWeight(e.target.value)}/>
                            </div>

                            <button className={CreateItemCss.add_info + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-8 offset-2'}
                                onClick={addInfo}>
                                Добавить информацию
                            </button>
                            <div>
                                {info.map(i =>
                                    <div>
                                        <textarea
                                            value={i.info}
                                            onChange={(e) => changeInfo(e.target.value, i.number)}
                                            type="text"
                                            className={CreateItemCss.input_info + ' input-info col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                            placeholder="Введите описание" />
                                        <Button onClick={() => removeInfo(i.number)} variant={"danger"}>Удалить</Button>
                                    </div>
                                )}
                            </div>
                            <button className={CreateItemCss.add_item + ' add-item col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-8 offset-2'}
                                    onClick={addItem}>
                                Добавить товар
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ModalWindow show={showModal} text={modalText} onHide={() => setShowModal(false)}/>
        </section>
    );
});

export default CreateItem;