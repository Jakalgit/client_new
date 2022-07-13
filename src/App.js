import logo from './logo.svg';
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/Navbar";
import AppRouter from "./components/AppRouter";
import React, {useContext, useEffect, useState} from "react";
import {init} from "./http/userAPI";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {Spinner} from "react-bootstrap";
import {fetchOneItem, getAllBasketItems, initBasket} from "./http/itemAPI";

const App = observer(() => {

    const {user} = useContext(Context)
    const {item} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        init().then(data => {
            user.setUser(data.data)
            initBasket(user.user.id).then(data => {
                user.setBasket(data)
                let mas = []
                getAllBasketItems(user.basket.id).then(data => {
                    data.rows.map(dataItem => {
                        fetchOneItem(dataItem.itemId).then(data => {
                            mas.push([dataItem.count, dataItem.basketId, data])
                        }).finally(() => {
                            item.setBasketItems(mas)
                        })
                    })
                }).finally(() => {
                    setLoading(false)
                })
            })
        })
    }, [])

    user.setIsAdmin(user.user.role === 'ADMIN')

    if (loading) {
        return <Spinner animation={"grow"} />
    }

  return (
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
  );
})

export default App;