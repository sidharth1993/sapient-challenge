import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronItems, Product } from '../interface';
import { getCartItems } from '../reducers/cartReducer';
import { RootState } from '../store/store';
import useWindowClick from '../utils/useWindowClick';
import ChevronDownIcon from './icons/ChevronDownIcon';
import DeliveryCartIcon from './icons/DeliveryCartIcon';
import TipProductDisplay from './TipProductDisplay';



const ItemsWithChevron  = ({itemNumber}: ChevronItems) : React.ReactElement => {
  const isSingular = Boolean(itemNumber === 1);
  const downRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const [open, setOpen] = useState(false);
  const isWindowClick: boolean = useWindowClick(downRef);

  const clickHandler = () => {
    setOpen(!open);
  }
  
  useEffect(() => {
    if (isWindowClick) {
      setOpen(false);
    }
  }, [isWindowClick]);
  
  return (
    <div ref={downRef} className="tooltip-parent">
      {
        `${itemNumber} ${isSingular? "Item" : "Items"}`
      }
      <button type="button" data-testid="cart-items-button" aria-label="items-in-cart" onClick={clickHandler} >
        <ChevronDownIcon/>
      </button>
      { open && <TipProductDisplay />}
    </div>
  )
}

const cartProductsTotal = (arr: Product[]) : number => {
  let total = 0;
  let i = 0;
  while (i < arr.length) {
    total += Number(arr[i].price);
    i++;
  }
  return total;
}

function Header() {

  const dispatch = useDispatch();
  const cartProducts = useSelector( (state: RootState) => state.cart.cartItems.products );

  useEffect(() => {
    dispatch(getCartItems())
  },[])

  return (
      <header id="header" data-testid="header" className="App-header">
        <div className="primary-secondary-text" id="cart-details" >
          <div className="primary-text">
            {
              `$ ${cartProductsTotal(cartProducts)}`
            }
          </div>
          <div className="secondary-text">
            { 
              cartProducts  && 
              <div  >
                <ItemsWithChevron itemNumber={cartProducts.length} />
              </div>
            }
          </div> 
        </div> 
        <div className="icon" id="delivery-cart" >
          <DeliveryCartIcon/>
        </div>
      </header>
  );
}

export default Header;
