import React from 'react'
import '../../assets/css/bootstrap.min.css'
import '../../assets/css/style.css'
import * as axios from "axios";
import siteLogo from "../../assets/images/Logo.png";
import categoriesLogo from "../../assets/images/lgmenu.png";
import orderLogo from "../../assets/images/lgkorz.png";
import Basket from "../Utility/Basket";

class Menu extends React.Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            basket_is_visible: "visible"
        }
    }

    componentDidMount() {
        axios.get(`https://canteen-chsu.ru/api/menu?CANTEEN-API-KEY=733fb9c1-db7f-4c0f-9cc0-59877c6cd8cf`).then(response => {
            this.setState({categories: response.data})
        })
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

    openOrderList(){
        if (this.state.basket_is_visible == "visible") {
            this.setState({basket_is_visible:"hidden"})
        }
        else {
            this.setState({basket_is_visible:"visible"})
        }
        console.log(this.state.basket_is_visible)
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
                    <Basket basket_is_visible={this.state.basket_is_visible}/>
                </div>
            </div>

        );
    }
}

export default Menu;