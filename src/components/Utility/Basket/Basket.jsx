import React from 'react'
import * as axios from "axios";
import './Basket.modle.css'
import './Basket_media.module.css'
import {NotificationContainer, NotificationManager} from 'react-notifications';


class Basket extends React.Component{
    constructor() {
        super();
        this.state = {
            orderList: [],
            orderPrice: 0,
            visible: null
        }
    }

    componentDidMount() {
        this.setState({visible:this.props.basket_is_visible})
    }

    createNotification = (data) => {
        return (
            NotificationManager.success("Ваш заказ выполнен, номер заказа - " + data, 'Ваш заказ принят')
        )

    };


    createOrder(){
        let orderListForSend = []
        let object = {
            products: orderListForSend
        }
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'CANTEEN-API-KEY': '733fb9c1-db7f-4c0f-9cc0-59877c6cd8cf'
            }
        }
        this.props.orderList.forEach(element => orderListForSend.push({ id: element.id, quantity: element.quantity}));
        console.log(JSON.stringify(object))
        axios.post('https://canteen-chsu.ru/api/orders', JSON.stringify(object),config).then((response) => {
            console.log(response.data)
            //alert("Ваш заказ выполнен, номер заказа - " + response.data.id)
            this.createNotification(response.data.id)
        })
    }

    productForOrder = {
        id: null,
        quantity: 0
    }


    render() {
        if (this.state.visible == "visible"){
            return (
                <div className="basket" style={{visibility: this.props.basket_is_visible}}>
                    {
                        this.props.orderList.map((product, index) => {
                                return (
                                    <div className="order_dish">
                                        <div className="row order_dish_row">
                                            <img className="col-sm"  src={product.image}/>
                                            <div className="col-sm">
                                                <div className="basket_dish_name">{product.title}</div>
                                                <div className="row price_row">
                                                    <span className="col-sm basket_dish_price">{product.price}руб.</span>
                                                    <span className="col-sm basket_dish_count">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{product.quantity}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        )
                    }
                    <div className="dividing_line" />
                    <div className="row order_price">
                        <span>Итог:&nbsp; </span>
                        <span>{this.props.orderPrice} руб</span>
                    </div>
                    <div className="row">
                        <button type="button" className="btn btn-secondary col-sm create_order_btn"
                                onClick={event => this.createOrder()}>Оформить</button>
                        <button type="button" className="btn btn-secondary col-sm clear_order_btn"
                                onClick={event => this.props.clearOrderList()}>Очистить</button>
                    </div>

                </div>
            )
        }
        else return null

    }
}

export default Basket;