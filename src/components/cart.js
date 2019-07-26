import React from "react";
import { Icon } from "antd";

export default class Cart extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  AddItemToCart = itemObj => {};

  render() {
    return (
      <div>
        <Icon type='shopping-cart' />
        <span>1</span>
      </div>
    );
  }
}
