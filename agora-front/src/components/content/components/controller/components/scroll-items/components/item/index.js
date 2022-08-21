import React from "react";
import { connect } from "react-redux";
import styles from "./styles.css";

export const Item = ({ name, nulls, props, title }) => {
  const NameComponent = ({ name }) => {
    return <span className={styles.name}>{name}</span>;
  };

  const PropsComponent = ({ props }) => {
    return (
      <div className={styles.props__container}>
        {props.map((el, i) => (
          <span className={styles.prop} key={`prop-${i}`}>
            <span className={styles.prop__key}>{el.key + ":"}</span>
            <span className={styles.prop__value}>&nbsp;{el.value}</span>
          </span>
        ))}
      </div>
    );
  };

  const NullsComponent = ({ nulls }) => {
    let string = [];
    nulls.forEach((el) => {
      string.push(`${el}`);
    });
    return (
      <span className={styles.prop}>
        <span className={styles["null-prop"]}>{string}</span>
      </span>
    );
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
      {name && <NameComponent name={name} />}
      {props && <PropsComponent props={props} />}
      {nulls && <NullsComponent nulls={nulls} />}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
