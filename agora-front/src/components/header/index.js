import React from "react";
import { connect } from "react-redux";
import { Typography } from "antd";
import Logo from './media/logo.png'
import styles from "./styles.css";

const { Title } = Typography;

export const Header = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={Logo} alt="logo" className={styles.logo}/>
        <div className={styles.navbar}>
          <button className={styles.button}>First</button>
          <button className={styles.button}>Second</button>
          <button className={styles.button}>Third</button>
          <button className={styles.button}>Fourth</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
