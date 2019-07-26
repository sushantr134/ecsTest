import { GET_BOOKS_ITEMS, ADD_CART_ITEMS } from "./types";

export const fetchBooks = () => {
  var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  return dispatch => {
    fetch(proxyUrl + "http://starlord.hackerearth.com/books")
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: GET_BOOKS_ITEMS,
          payload: data
        });
      });
  };
};

export const AddItemsToCart = items => {
  return {
    type: ADD_CART_ITEMS,
    payload: items
  };
};
