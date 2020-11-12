import React from 'react';
import * as axios from 'axios';
import '../../assets/css/bootstrap.min.css'
import '../../assets/css/style.css'
import siteLogo from '../../assets/images/Logo.png'
import categoriesLogo from '../../assets/images/lgmenu.png'
import orderLogo from '../../assets/images/lgkorz.png'

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios.get(`https://canteen-chsu.ru/api/menu?CANTEEN-API-KEY=733fb9c1-db7f-4c0f-9cc0-59877c6cd8cf`).then(response => {
            this.setState({categories: response.data})
        })
    }

    openOrderList(){
        if (window.basketVisible == "visible") window.basketVisible = "hidden"
        else window.basketVisible = "visible"
        console.log(window.basketVisible)
    }

    render() {
        return (
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
        );
    }
}

export default Header;