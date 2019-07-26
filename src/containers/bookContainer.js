import React from "react";
import styles from "./styles.scss";

export default class BookContainer extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <section className={styles.bookContainer}>{this.props.children}</section>;
  }
}
