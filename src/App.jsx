import React from "react";
import { Layout, Spin, Input } from "antd";

import FetchBooks from "./components/fetchBooks";
import Cart from "./components/cart";

import styles from "./app.global.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchBooks, AddItemsToCart } from "./redux/actions";

const { Header, Content } = Layout;

class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    return (
      <Layout>
        <Header>
          <h1 style={{ color: "white" }}>Books Store</h1>
        </Header>
        <Content className={styles.Container}>
          {this.props.bookStoreData.booksData.length > 0 ? (
            <FetchBooks addItemsToCartHandler={this.props.AddItemsToCart} booksData={this.props.bookStoreData.booksData} />
          ) : (
            <Spin tip='Loading Books...' />
          )}
        </Content>
      </Layout>
    );
  }
}

export default connect(
  state => {
    return {
      bookStoreData: state.booksStore
    };
  },
  dispatch => {
    return bindActionCreators(
      {
        fetchBooks,
        AddItemsToCart
      },
      dispatch
    );
  }
)(App);
