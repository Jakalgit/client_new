import React, {useEffect, useState} from 'react';
import OrdersCss from '../../css/admin/Orders.module.css'
import {fetchAllOrders} from "../../http/itemAPI";
import Order from "../../components/Order";
import {useNavigate} from "react-router-dom";

const Orders = () => {

    const [listOrders, setListOrders] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetchAllOrders().then(data => {
            setListOrders(data)
        })
    }, [])

    return (
        <section className={OrdersCss.order_check_section}>
            <div className="container">
                <div className="row">
                    <h2 className={OrdersCss.your_order}>Ваши заказы</h2>
                    <div className={OrdersCss.example_block}>
                        <div className={OrdersCss.round + ' ' + OrdersCss.turquoise}></div>
                        <h2 className={OrdersCss.text}>Заказ выполянется</h2>
                    </div>
                    <div className={OrdersCss.example_block}>
                        <div className={OrdersCss.round + ' ' + OrdersCss.green}></div>
                        <h2 className={OrdersCss.text}>Заказ выполнен</h2>
                    </div>
                    <div className={OrdersCss.example_block}>
                        <div className={OrdersCss.round + ' ' + OrdersCss.red}></div>
                        <h2 className={OrdersCss.text}>Заказ отклонён</h2>
                    </div>
                    <div className={OrdersCss.example_block}>
                        <div className={OrdersCss.round + ' ' + OrdersCss.yellow}></div>
                        <h2 className={OrdersCss.text}>Заказ ожидает подтверждения</h2>
                    </div>
                    <div className='list-order col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                        {listOrders.map(order =>
                            <Order submit={order.typeSubmit.toLowerCase()} date={order.createdAt.substring(0, order.createdAt.search('T'))} id={order.id} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Orders;