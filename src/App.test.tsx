import App from './App';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { getCartItems, postCartItem, removeIdFromCart, removeProductFromCart } from './reducers/cartReducer';
import { Persistance } from './utils/persistance';

const testStore = configureStore({
    reducer: {
        cart: createSlice({
            name: 'cart',
            initialState: {
                cartItems: {
                    "products": [
                      {
                        "id": "123442",
                        "title": "Product 1",
                        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
                        "image": "/product1.jpeg",
                        "price": "39",
                        "currency": "$"
                      },
                      {
                        "id": "123443",
                        "title": "Product 2",
                        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
                        "image": "/product2.jpeg",
                        "price": "39",
                        "currency": "$"
                      }
                    ]
                  }
             },
             reducers: {},
             extraReducers(builder) {
                builder
                .addCase(getCartItems.fulfilled, (state, action) => ({
                    cartItems: action.payload
                }))
                .addCase(postCartItem.fulfilled, (state, action) => ({
                    cartItems: {
                        products: [
                            {
                                "id": "123442",
                                "title": "Product 1",
                                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
                                "image": "/product1.jpeg",
                                "price": "39",
                                "currency": "$"
                              },
                              {
                                "id": "123442",
                                "title": "Product 1",
                                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
                                "image": "/product1.jpeg",
                                "price": "39",
                                "currency": "$"
                              }
                        ]
                    }
                }))
                .addCase(removeIdFromCart.fulfilled, (state, action) => ({
                    cartItems: {
                        products: action.payload
                    }
                }))
                .addCase(removeProductFromCart.fulfilled, (state,action) => ({
                    cartItems: {
                        products: action.payload
                    }
                }))
            }
        }).reducer,
        products: createSlice({
            name: 'products',
            initialState: {
                "products": [
                  {
                    "id": "123442",
                    "title": "Product 1",
                    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
                    "image": "/product1.jpeg",
                    "price": "39",
                    "currency": "$"
                  },
                  {
                    "id": "123443",
                    "title": "Product 2",
                    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
                    "image": "/product2.jpeg",
                    "price": "39",
                    "currency": "$"
                  }
                ]
              },
             reducers: {},    
        }).reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActionPaths: ['payload.config', 'payload.request', 'meta.arg']
        }
    })
})

const renderComponent = () => render(
    <Provider store={testStore} >
      <App/>
    </Provider> 
  );

describe('App component', () => {

  test('renders header and products components', () => {
    renderComponent();
    const headerElement = screen.getByTestId('header')
    const productsListElement = screen.getByTestId('products-list');
    expect(headerElement).toBeInTheDocument();
    expect(productsListElement).toBeInTheDocument();
  });
}) 

describe('Header component', () => {

    test('renders header with total cost of items in cart', () => {
        renderComponent();
        const amountDisplayText = screen.getByText('$ 78');
        expect(amountDisplayText).toBeInTheDocument();
    });

    test('renders header with delivery cart icon', () => {
        renderComponent();
        const deliveryCartIcon = screen.getByTestId('delivery-cart');
        expect(deliveryCartIcon).toBeInTheDocument();
    });
      
    test('renders header with item qty in cart', () => {
        renderComponent();
        const itemsDisplayText = screen.getByText('2 Items');
        expect(itemsDisplayText).toBeInTheDocument();
    });

    test('renders component with current items in cart on click of arrow in header', () => {
        renderComponent();
        fireEvent.click(screen.getByTestId('cart-items-button'));
        const itemsDisplayText = screen.getByTestId('cart-items-list');
        expect(itemsDisplayText).toBeInTheDocument();
    });

    test('hides component with current items in cart on window click', () => {
        renderComponent();
        fireEvent.click(screen.getByTestId('cart-items-button'));
        const itemsDisplayText = screen.getByTestId('cart-items-list');
        expect(itemsDisplayText).toBeInTheDocument();
        userEvent.click(screen.getByText('$ 78'));
        expect(itemsDisplayText).not.toBeVisible();
    });

    test('removes item from cart component on remove click', () => {
        jest.spyOn(Persistance,'deleteProductFromCart');
        renderComponent();
        fireEvent.click(screen.getByTestId('cart-items-button'));
        const itemsDisplayText = screen.getByTestId('cart-items-list');
        expect(itemsDisplayText).toBeInTheDocument();
        userEvent.click(screen.getAllByTestId('remove-item-button')[0]);
        expect(Persistance.deleteProductFromCart).toHaveBeenCalled();
    });

});

describe("Product component", () => {
    test('list of products available are displayed', () => {
        renderComponent();
        const productsItemDisplay = screen.getAllByTestId('product-item');
        expect(productsItemDisplay.length).toBe(2);
    });

    test('increases product quantity on click of add button', () => {
        jest.spyOn(Persistance,'postItemToCart');
        renderComponent();
        const productsItemIncrease = screen.getAllByTestId('product-qty-increase');
        userEvent.click(productsItemIncrease[0]);
        expect(Persistance.postItemToCart).toHaveBeenCalled();

    })

    test('reduces product quantity on click of subtract button', () => {
        jest.spyOn(Persistance,'deleteIdFromCart');
        renderComponent();
        const productsItemReduce = screen.getAllByTestId('product-qty-reduce');
        userEvent.click(productsItemReduce[0]);
        expect(Persistance.deleteIdFromCart).toHaveBeenCalled();

    })

    test('zooms on product image on click', () => {
        renderComponent();
        const productImage = screen.getAllByTestId('product-image-zoom');
        userEvent.click(productImage[0]);
        const prodImageZoomed = screen.getAllByTestId('product-image-on-zoom');
        expect(prodImageZoomed.length).toBe(1);
    })

    test('zooms out of product image on mouse interaction with other items', () => {
        renderComponent();
        const productImage = screen.getAllByTestId('product-image-zoom');
        userEvent.click(productImage[0]);
        const prodImageZoomed = screen.getAllByTestId('product-image-on-zoom');
        expect(prodImageZoomed.length).toBe(1);
        userEvent.click(screen.getByTestId('cart-items-button'));
        expect(prodImageZoomed[0]).not.toBeVisible();
    })

    test('does not zoom out of product image on mouse interaction with zoom image', () => {
        renderComponent();
        const productImage = screen.getAllByTestId('product-image-zoom');
        userEvent.click(productImage[0]);
        const prodImageZoomed = screen.getAllByTestId('product-image-on-zoom');
        expect(prodImageZoomed.length).toBe(1);
        userEvent.click(prodImageZoomed[0]);
        expect(prodImageZoomed[0]).toBeVisible();
    })
})

