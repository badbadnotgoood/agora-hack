import React from "react";
import { connect } from "react-redux";
import { Typography } from "antd";
import Logo from "./media/logo.png";
import styles from "./styles.css";

const { Title } = Typography;

export const Header = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={Logo} alt="logo" className={styles.logo} />
        <div className={styles.navbar}>
          <a href="http://51.250.29.0/web/dots.html" target='_blank' className={styles.button}>Визуализация Референсов</a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
