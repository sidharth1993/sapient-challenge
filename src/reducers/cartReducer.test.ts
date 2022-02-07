import cartReducer, { getCartItems, postCartItem, removeIdFromCart, removeProductFromCart } from './cartReducer';

describe('Creating cart tests', () => {
  const initialState = {
    cartItems: {
        products: []
    }
  };

  it('should return the initial state', () => {
    expect(cartReducer(undefined, { type: '' })).toEqual({
      ...initialState,
    });
  });

  it('should return the cart items state on adding item', () => {
    const products: any = []  
    expect(cartReducer(undefined, { type: postCartItem.fulfilled.type, payload:products })).toEqual({
        cartItems:  {
         products:  []
        }
      });
  });

  it('should return the cart items state on removing item id', () => {
    const products: any = []  
    expect(cartReducer(undefined, { type: removeIdFromCart.fulfilled.type, payload:products })).toEqual({
        cartItems:  {
         products:  []
        }
      });
  });

  it('should return the cart items state on removing product from cart', () => {
    const products: any = []  
    expect(cartReducer(undefined, { type: removeProductFromCart.fulfilled.type, payload:products })).toEqual({
        cartItems:  {
         products:  []
        }
      });
  });

  it('should return the cart items state on getting cart items', () => {
    const cartItem = {
        products: []
    }
    expect(cartReducer(undefined, { type: getCartItems.fulfilled.type, payload:cartItem })).toEqual(initialState);
  });

});
