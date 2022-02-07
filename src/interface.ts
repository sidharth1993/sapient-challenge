export interface ChevronItems {
    itemNumber: number,
}

export interface Product {
  id: string,
  title: string,
  desc: string,
  image: string,
  price: string,
  currency: string
}

export interface ProductQty {
  id: string,
  title: string,
  desc: string,
  image: string,
  price: string,
  currency: string,
  qty: number
}

export interface Products {
  products: Product[]
}

export interface CartItems {
  cartItems: Products
}
