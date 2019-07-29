import React from "react";
import { Spin, Card, Button, Icon, Rate, message } from "antd";
import styles from "./styles.scss";
import ButtonGroup from "antd/lib/button/button-group";
import Meta from "antd/lib/card/Meta";

const BookItem = ({ data, addItemToCart }) => {
  return (
    <Card
      style={{ width: 320, marginTop: 16 }}
      loading={false}
      actions={[<Button type='ghost' shape={"circle"} onClick={() => addItemToCart(data)} title='Add to cart' icon='shopping-cart' />]}>
      <Meta title={data.title} description={`Book Authors: ${data.authors}`} />
      <Rate disabled allowHalf={true} defaultValue={data.average_rating} />
      <span className='ant-rate-text'>{data.average_rating}</span>
      <ul className={styles.BookListItems}>
        <li>
          Price:{" "}
          <span>
            <b>{data.price}</b>
          </span>
        </li>
        <li>
          ISBN:{" "}
          <span>
            <b>{data.isbn}</b>
          </span>
        </li>
        <li>
          Ratings:{" "}
          <span>
            <b>{data.ratings_count}</b>
          </span>
        </li>
        <li>
          Language:{" "}
          <span>
            <b>{data.language_code}</b>
          </span>
        </li>
      </ul>
    </Card>
  );
};

export default class FetchBooks extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startIndex: 0,
      endIndex: 10,
      itemsAddedToCart: 0,
      cartItems: []
    };
    this.limit = 10;
    this.handleBackBooksLimit = this.handleBackBooksLimit.bind(this);
    this.handleNextBooksLimit = this.handleNextBooksLimit.bind(this);
  }

  AddItemToCart = itemObj => {
    var cartObj = {
      item: itemObj,
      qty: 1
    };
    var indx = this.state.cartItems.findIndex(obj => obj.item.bookID === cartObj.item.bookID);
    if (indx > -1) {
      cartObj = {
        item: this.state.cartItems[indx].item,
        qty: this.state.cartItems[indx].qty + 1
      };
      var cartItems = [...this.state.cartItems.slice(0, indx), cartObj];
      this.setState(() => {
        return {
          cartItems: cartItems
        };
      });
    } else {
      this.setState(prev => {
        return {
          cartItems: [...prev.cartItems, cartObj]
        };
      });
    }

    this.props.addItemsToCartHandler(this.state.cartItems);
  };

  checkEndLimit = dataArr => {
    if (this.state.endIndex === dataArr.length) {
      message.warning("Search Results reached end of limit.");
      this.setState({ startIndex: 0, endIndex: 10 });
      return true;
    } else {
      return false;
    }
  };

  handleNextBooksLimit = () => {
    this.checkEndLimit(this.props.booksData) != true &&
      this.setState(prev => {
        return {
          startIndex: prev.startIndex + this.limit,
          endIndex: prev.endIndex + this.limit
        };
      });
  };

  handleBackBooksLimit = () => {
    this.setState(prev => {
      return {
        startIndex: prev.startIndex - this.limit,
        endIndex: prev.endIndex - this.limit
      };
    });
  };

  render() {
    return (
      <>
        {/* <Button type='primary' style={{ width: "98px" }}>
              Go To Cart
            </Button> */}

        {this.props.booksData.length === 0 && message.error("No Such Results found")}
        <div className={styles.bookItemsContainer}>
          {this.props.booksData.slice(this.state.startIndex, this.state.endIndex).map(data => {
            return <BookItem key={data.bookID} data={data} addItemToCart={this.AddItemToCart} />;
          })}
        </div>

        <div className={styles.paginationContainer}>
          <ButtonGroup>
            {this.state.endIndex > 10 && this.state.startIndex > 0 && (
              <Button type='primary' onClick={this.handleBackBooksLimit}>
                <Icon type='backward' />
                Back
              </Button>
            )}
            <Button type='primary' onClick={this.handleNextBooksLimit}>
              Next <Icon type='forward' />
            </Button>
          </ButtonGroup>
        </div>
      </>
    );
  }
}
