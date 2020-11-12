import React from 'react'
import '../../assets/css/bootstrap.min.css'
import '../../assets/css/style.css'
import * as axios from "axios";
import siteLogo from "../../assets/images/Logo.png";
import categoriesLogo from "../../assets/images/lgmenu.png";
import orderLogo from "../../assets/images/lgkorz.png";

class Menu extends React.Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            orderList: [],
            orderPrice: 0,
            visible: window.basketVisible
        }
    }

    componentDidMount() {
        axios.get(`https://canteen-chsu.ru/api/menu?CANTEEN-API-KEY=733fb9c1-db7f-4c0f-9cc0-59877c6cd8cf`).then(response => {
            this.setState({categories: response.data})
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

    addInOrder(product) {
        this.productForOrder = {
            image: product.image,
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1
        }
        var contains = this.orderProducts.some(elem =>{
            return JSON.stringify(this.productForOrder) === JSON.stringify(elem);
        });
        if (contains != false){
            this.orderProducts.find(prod => prod.id == this.productForOrder.id).quantity++
        }
        else this.orderProducts.push(this.productForOrder)
        this.setState({orderList:this.orderProducts})
        this.calculateOrderPrice(this.orderProducts)
        console.log(this.orderProducts)
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

    clearOrderList(){
        this.orderProducts = []
        this.setState({orderList:[] , orderPrice: 0})
    }


    openOrderList(){
        if (window.basketVisible == "visible") {
            window.basketVisible = "hidden"
            this.setState({visible:window.basketVisible})
        }
        else {
            window.basketVisible = "visible"
            this.setState({visible:window.basketVisible})
        }
        console.log(window.basketVisible)
    }

    render() {
        return (
            <div className="main">
                <div className="container-fluid header">
                    <div className="row headerRow">
                        <div className="col-1"></div>
                        <div className="col-1 headerImg">
                            <img src={siteLogo} align="right"/>
                        </div>
                        <div className="dropdown col-2 buttonHeader">
                            <button className="btn dropdownHeader" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-expanded="false">
                                <img src={categoriesLogo}/> Категории
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <div className="row">
                                    {
                                        this.state.categories.map((category, index) => {
                                            return (
                                                <div className="col-6"><a className="dropdown-item"
                                                                          href={`#${index}`}>{category.name}</a></div>
                                            )
                                        })
                                    }
                                </div>
                            </ul>
                        </div>
                        <div className="col-2 searchHeader">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fas fa-search"></i></div>
                                </div>
                                <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Поиск"/>
                            </div>
                        </div>
                        <div className="col-2 phoneHeader">
                            +7 800 555-35-35
                        </div>
                        <div className="col-2 basketHeader">
                            <button className="btn dropdownHeader" type="button" id="dropdownMenuButtonKorz"
                                    data-toggle="dropdown" aria-expanded="false" onClick={event => this.openOrderList()}>
                                <img src={orderLogo}/> Корзина
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonKorz" >
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="background">
                    <div className="container pcContainer">
                        {
                            this.state.categories.map((category, index) => {
                                return (
                                    <div className="row menu">
                                        <div className="col-12" id={index}>
                                            {category.name}
                                            <hr/>
                                            <div className="row">
                                                {
                                                    category.products.map((product, index) => {
                                                        return (
                                                            <div className="col-md-4 col-lg-3 col-xl-2">
                                                                <div className="card mx-auto mb-1" onClick={event => {
                                                                    this.addInOrder(product)
                                                                }}>
                                                                    <div className="dish">
                                                                        <img className="card-img-top" src={product.image}/>
                                                                        <div className="card-title">
                                                                            <div className="row">
                                                                            <span
                                                                                className="col-7 dish-name">{product.title}</span>
                                                                                <span
                                                                                    className="col-4 dish-price">{product.price} Р</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
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
                </div>
            </div>

        );
    }
}

export default Menu;