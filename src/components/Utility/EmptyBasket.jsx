import React from 'react'
import empty_basket from '../../assets/images/empty_basket_icon.png'

class EmptyBasket extends React.Component{
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <img src={empty_basket}/>
                <h3>Ваша корзина пустая</h3>
            </div>
        )
    }
}

export default EmptyBasket;