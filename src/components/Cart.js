import { useCartStore } from '../store/cart';
import React from 'react';

const Cart = () => {
  const open = useCartStore((store) => store.state.open);
  const toggleButton = useCartStore((store) => store.actions.toggle);

  return (
    <div
      className={`${
        !open ? 'hidden' : ''
      } fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300`}
      data-testid="shopping-cart"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium text-gray-700">Your cart</h3>
        <button
          v-if="hasProducts"
          data-testid="clear-cart-button"
          // @click="$cart.clearProducts()"
        >
          clear cart
        </button>
        <button
          data-testid="close-button"
          className="text-gray-600 focus:outline-none"
          onClick={() => toggleButton()}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <hr className="my-3" />
      {/* <cart-item
      v-for="product in products"
    //   :key="product.id"
    //   :product="product"
      data-testid="cart-item"
    /> */}
      <h3 v-if="!hasProducts">Cart is empty</h3>
      <form data-testid="checkout-form">
        <div v-if="hasProducts" className="mt-4">
          <hr />
          <label
            className="block text-gray-700 mt-2 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          // onClick={}
          data-testid="checkout-button"
          type="submit"
          className="flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
        >
          <span>Checkout</span>
          <svg
            className="h-5 w-5 mx-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Cart;
