import React from 'react'
import '../../assets/css/bootstrap.min.css'
import '../../assets/css/style.css'
import * as axios from "axios";
import siteLogo from "../../assets/images/Logo.png";
import categoriesLogo from "../../assets/images/lgmenu.png";
import orderLogo from "../../assets/images/lgkorz.png";
import addLogo from "../../assets/images/add_icon.png"
import Basket from "../Utility/Basket/Basket";
import {NotificationContainer} from "react-notifications";
import Counter from "../Utility/Counter/Counter";

class Menu extends React.Component {
    constructor() {
        super();
        this.child = React.createRef();
        this.state = {
            categories: [],
            orderList: [],
            basket_is_visible: "visible"
        }
    }

    componentDidMount() {
        axios.get(`https://canteen-chsu.ru/api/menu?CANTEEN-API-KEY=733fb9c1-db7f-4c0f-9cc0-59877c6cd8cf`).then(response => {
            this.setState({categories: response.data})
            console.log(response.data)
        })
    }

    orderProducts = []

    calculateOrderPrice(orderList) {
        let price = 0;
        this.orderProducts.forEach(element => price += element.price * element.quantity);
        this.setState({orderPrice: price})
    }

    addInOrder(product) {
        this.productForOrder = {
            image: product.image,
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: this.child.current.returnCount()
        }
        var contains = this.orderProducts.some(elem => {
            return this.productForOrder.id === elem.id;
        });
        debugger
        if (contains != false) {
            let tempCount = this.orderProducts.find(prod => prod.id == this.productForOrder.id).quantity
            this.orderProducts.find(prod => prod.id == this.productForOrder.id).quantity = tempCount + this.productForOrder.quantity
        } else this.orderProducts.push(this.productForOrder)
        this.setState({orderList: this.orderProducts})
        this.calculateOrderPrice(this.orderProducts)
        console.log(this.orderProducts)
    }

    openOrderList() {
        if (this.state.basket_is_visible == "visible") {
            this.setState({basket_is_visible: "hidden"})
        } else {
            this.setState({basket_is_visible: "visible"})
        }
        console.log(this.state.basket_is_visible)
    }

    clearOrderList() {
        this.orderProducts = null
        this.setState({orderList: [], orderPrice: 0})
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
                                <input type="text" className="form-control" id="inlineFormInputGroup"
                                       placeholder="Поиск"/>
                            </div>
                        </div>
                        <div className="col-2 phoneHeader">
                            +7 800 555-35-35
                        </div>
                        <div className="col-2 basketHeader">
                            <button className="btn dropdownHeader" type="button" id="dropdownMenuButtonKorz"
                                    data-toggle="dropdown" aria-expanded="false"
                                    onClick={event => this.openOrderList()}>
                                <img src={orderLogo}/> Корзина
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonKorz">
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="background">
                    <div className="container pcContainer">
                        <div className="noti">
                            <NotificationContainer/>
                        </div>

                        {
                            this.state.categories.map((category, index) => {
                                return (
                                    <div className="row menu">
                                        <div className="col-12 col-lg-9 col-md-8 col-xl-10" id={index}>
                                            {category.name}
                                            <hr/>
                                            <div className="row">
                                                {
                                                    category.products.map((product, index) => {
                                                        const {id, composition, description, image, price, title, weight, count = 1 } = product
                                                        return (
                                                            <div className="col-4 col-md-6 col-lg-4 col-xl-3">
                                                                <div className="card mx-auto mb-1" >
                                                                    <div className="dish">
                                                                        <img className="card-img-top"
                                                                             src={image}/>
                                                                        <div className="card-title">
                                                                            <span
                                                                                className="col-md-6 dish-name">{title}</span>
                                                                            <div className="row product_info_row justify-content-between p-2">
                                                                                <span className=" dish-price">{weight} гр</span>
                                                                                <span
                                                                                    className=" dish-price">{price} ₽</span>
                                                                            </div>
                                                                            <div className="row count_row justify-content-between align-items-center">
                                                                                <Counter ref={this.child} count={count}/>
                                                                                <div className="col-md-6 col-lg-4
                                                                                    col-xl-4 col-6 addInOrder" onClick={event => {
                                                                                    this.addInOrder(product)
                                                                                }}>
                                                                                    <img src={addLogo}/>
                                                                                </div>
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
                    <Basket basket_is_visible={this.state.basket_is_visible} orderList={this.state.orderList}
                            orderPrice={this.state.orderPrice} clearOrderList={this.clearOrderList}/>
                </div>
            </div>

        );
    }
}

export default Menu;