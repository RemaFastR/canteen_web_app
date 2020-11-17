import React from 'react'
import css from './EmptyBasket.module.css'
import empty_basket from '../../../assets/images/empty_basket_icon.png'

class EmptyBasket extends React.Component{
    constructor() {
        super();
    }

    render() {
        return (
            <div className={css.empty_basket} >
                <div  >
                    <img className={css.empty_basket_logo} src={empty_basket} />
                </div>
                <div className={css.empty_basket_label}>
                    <h3 >Ваша корзина пустая</h3>
                </div>
            </div>
        )
    }
}

export default EmptyBasket;