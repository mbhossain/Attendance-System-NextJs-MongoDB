import React from 'react';
import AddToCart from '../AddToCart';
import style from './ProductCart.module.css';

const ProductCard = () => {
    return (
        // <div className={style.cart}>
        // <div className='p-5 my-5 bg-sky-400 text-white text-xl hover:bg-sky-500'>
        <div>
            <AddToCart />
        </div>
    )
}

export default ProductCard