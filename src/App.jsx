import React from "react";
import { Layout, Spin, Input } from "antd";

import FetchBooks from "./components/fetchBooks";
import Cart from "./components/cart";

import styles from "./app.global.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchBooks, AddItemsToCart } from "./redux/actions";

const { Header, Content } = Layout;
const { Search } = Input;

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      searchResults: []
    };
  }

  componentDidMount() {
    this.props.fetchBooks();
  }

  handleSearch = searchValue => {
    var SearchValues = [];
    SearchValues = this.props.bookStoreData.booksData.filter(bookObj => {
      return (
        bookObj.title
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        bookObj.authors
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    });
    console.log(SearchValues);
    this.setState({ searchResults: SearchValues });
  };

  render() {
    return (
      <Layout>
        <Header>
          {/* <h1 style={{ color: "white" }}>Books Store</h1> */}
          <Search placeholder='Search Books' onSearch={value => this.handleSearch(value)} style={{ width: 230 }} />
        </Header>
        <Content className={styles.Container}>
          {this.props.bookStoreData.booksData.length > 0 ? (
            <FetchBooks
              addItemsToCartHandler={this.props.AddItemsToCart}
              booksData={this.state.searchResults.length > 0 ? this.state.searchResults : this.props.bookStoreData.booksData}
            />
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
