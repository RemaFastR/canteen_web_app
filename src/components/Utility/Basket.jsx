import React from 'react'
import * as axios from "axios";

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
        this.orderProducts.forEach(element => orderListForSend.push({ id: element.id, quantity: element.quantity}));
        console.log(JSON.stringify(object))
        axios.post('https://canteen-chsu.ru/api/orders', JSON.stringify(object),config).then((response) => {
            console.log(response.data)
            alert("Ваш заказ выполнен, номер заказа - " + response.data.id)
        })
    }

    orderProducts= []
    productForOrder = {
        id: null,
        quantity: 0
    }

    calculateOrderPrice(orderList){
        let price = 0;
        this.orderProducts.forEach(element => price += element.price * element.quantity);
        this.setState({orderPrice:price})
    }

    clearOrderList(){
        this.orderProducts = []
        this.setState({orderList:[] , orderPrice: 0})
    }

    render() {
        if (this.state.visible == "visible"){
            return (
                <div className="basket" style={{visibility: this.state.visible}}>
                    {
                        this.state.orderList.map((product, index) => {
                                return (
                                    <div className="order_dish">
                                        <img className="card-img-top order_product_img" src={product.image}/>
                                        <div className="card-title">
                                            <div>{product.title}</div>
                                            <div className="row">
                                                <span className="col-sm dish-name">{product.price}руб.</span>
                                                <span className="col-sm dish-price">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{product.quantity}</span>
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
                        <span>{this.state.orderPrice} руб</span>
                    </div>
                    <div className="row">
                        <button type="button" className="btn btn-secondary col-sm create_order_btn"
                                onClick={event => this.createOrder()}>Оформить</button>
                        <button type="button" className="btn btn-secondary col-sm clear_order_btn"
                                onClick={event => this.clearOrderList()}>Очистить</button>
                    </div>
                </div>
            )
        }
        else return null

    }
}

export default Basket;