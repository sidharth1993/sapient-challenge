import cartReducer, { getCartItems, postCartItem, removeIdFromCart, removeProductFromCart } from './cartReducer';
import productReducer, { getProducts } from './productReducer';

describe('Creating product tests', () => {
  const initialState = {
    products: []
  };

  it('should return the initial state', () => {
    expect(productReducer(undefined, { type: '' })).toEqual({
      ...initialState,
    });
  });

  it('should return the product items state on getting array', () => {
    expect(productReducer(undefined, { type: getProducts.fulfilled.type, payload:{data:{}} })).toEqual({});
  });

});
