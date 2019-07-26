import { GET_BOOKS_ITEMS, ADD_CART_ITEMS } from "./types";

const InitialState = {
  booksData: [],
  cartItemsData: []
};

const booksReducer = (state = InitialState, action) => {
  switch (action.type) {
    case GET_BOOKS_ITEMS:
      return { ...state, booksData: action.payload };

    case ADD_CART_ITEMS: {
      return {
        ...state,
        cartItemsData: action.payload
      };
    }
    default:
      return state;
  }
};

export default booksReducer;
