import { MouseEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCartItem, removeIdFromCart, removeProductFromCart } from '../reducers/cartReducer';
import { getProducts } from '../reducers/productReducer';
import { RootState } from '../store/store';
import useWindowClick from '../utils/useWindowClick';
import AddIcon from './icons/AddIcon';
import SubtractIcon from './icons/SubtractIcon';

function Products() {

    const dispatch = useDispatch();
    const products = useSelector( (state: RootState) => state.products.products );
    const cart = useSelector( (state: RootState) => state.cart.cartItems.products );
    const [showZoom, setShowZoom] = useState([] as boolean[]);
    const imgRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
    const isWindowClick: boolean = useWindowClick(imgRef);

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    const setAllZoomFalse = () => {
        setShowZoom(new Array(cart.length).fill(false))
    }

    const setImageZoom = (index: number) => {
        const newArr = Object.assign(showZoom);
        newArr.splice(index, 1, true);
        setShowZoom([...newArr]);
    }

    useEffect(() => {
        if (isWindowClick) {
            setAllZoomFalse();
        }
    }, [isWindowClick])

    useEffect(() => {
        setAllZoomFalse();
    }, [cart])

    const prodQtyInCart = (id: string) : string => {
        let qty = 0;
        if (cart && cart.length) {
            qty = cart.filter((item) => item.id === id).length;
        }
        return qty.toString();
    }

    const addToCart = (e: MouseEvent) => {
        const productToAdd = products.find((item) => item.id === e.currentTarget.children[0].innerHTML);
        if (productToAdd) {
            dispatch(postCartItem(productToAdd));
        }
    }

    const removeFromCart = (e: MouseEvent) => {
        dispatch(removeIdFromCart(e.currentTarget.children[0].innerHTML));
    }

  return (
        <div className="products-list" id="products-list" data-testid="products-list">
            {
                products && products.map((product, index) => {
                    return (
                        <div className="product-item" data-testid="product-item" key={product.id} >
                            <div className="product-description">
                                <div className="product-image product-image-parent">
                                    <img src={`/images${product.image}`} data-testid="product-image-zoom" onClick={() => setImageZoom(index)} alt={product.title} height={40} width={40} />
                                    {   
                                        showZoom[index] &&
                                        <div ref={imgRef} className="product-image-zoom" data-testid="product-image-on-zoom" onMouseLeave={setAllZoomFalse}>
                                            <img src={`/images${product.image}`} width={300} height={300} alt={product.title} />
                                        </div>
                                    }
                                </div>
                                <div className="primary-secondary-text" >
                                    <div className="primary-text">
                                            {product.title}
                                    </div>
                                    <div className="secondary-text">
                                        {product.desc}
                                    </div>
                                </div>
                                <div className="product-description" id="add-remove-from-cart" >
                                    <button type="button" data-testid="product-qty-reduce" aria-label="remove-from-cart" onClick={removeFromCart}><span className="hidden-id" >{product.id}</span><SubtractIcon/></button>
                                    <div><input type="text" data-testid="quantity-in-cart" name="quantity-in-cart" aria-label={`${product.title}-quantity-in-cart`} disabled value={prodQtyInCart(product.id)} autoComplete="off" ></input></div>
                                    <button type="button" data-testid="product-qty-increase" aria-label="add-to-cart" onClick={addToCart}><span className="hidden-id" >{product.id}</span><AddIcon/></button>
                                </div>
                                <div className="product-description primary-text">
                                    <div>{product.currency} </div>
                                    <div>{product.price}</div>
                                </div>
                            </div>   
                        </div>
                    )
                })
            }
        </div>
  );
}

export default Products;