import React from "react";
import { connect } from "react-redux";
import { Col, Divider, Row } from "antd";
import styles from "./styles.css";
import Controller from "./components/controller";

export const Content = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Controller />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
