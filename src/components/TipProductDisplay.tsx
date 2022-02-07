import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductQty } from '../interface';
import { removeProductFromCart } from '../reducers/cartReducer';
import { RootState } from '../store/store';
import CloseIcon from './icons/CloseIcon';

function TipProductDisplay() {
    const [cartDisplay, setCartDisplay] = useState([] as ProductQty[]);
    const dispatch = useDispatch();
    const cartProducts = useSelector( (state: RootState) => state.cart.cartItems.products );

    const removeFromCart = (id: string) => {
        dispatch(removeProductFromCart(id))
    }

    useEffect(() => {
        let arr: ProductQty[] = [];
        cartProducts.forEach((item) => {
            const itemIndex = arr.findIndex((arrItem) => arrItem.id === item.id);
            if (itemIndex < 0) {
                arr.push({...item,qty:1});
            } else {
                arr[itemIndex] = {...arr[itemIndex],qty:arr[itemIndex].qty+1}
            }
        })
        setCartDisplay(arr);
    }, [cartProducts])

    return (
        <div className="tooltip" data-testid="cart-items-list">
            {
                cartDisplay.map((product,index) => {
                    return (
                        <div key={`${product.id}-${index}`} className="tooltip-products" >
                            <div>
                                <button type="button" data-testid="remove-item-button"  onClick={() => removeFromCart(product.id)} >
                                    <CloseIcon />
                                </button>
                            </div>
                            <div className="primary-secondary-text" >
                                <div className="primary-text">
                                    {product.title}
                                </div>
                                <div className="primary-text">
                                    {product.currency} {product.price}
                                </div> 
                            </div> 
                            <div className="secondary-text">
                                Qty {product.qty}
                            </div>    
                        </div>
                    )
                })
            }
        </div>
    );
}

export default TipProductDisplay;
