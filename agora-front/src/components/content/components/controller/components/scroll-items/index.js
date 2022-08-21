import React from "react";
import { connect } from "react-redux";
import Item from "./components/item";
import styles from "./styles.css";

export const ScrollItems = ({ list }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {list &&
          list.map((el, i) => {
            const { referenceItem, item } = el;

            return (
              <div className={styles.block} key={`block-${i}`}>
                {referenceItem && (
                  <Item
                    title={"Оригинальный оригинал"}
                    name={referenceItem.name}
                    nulls={referenceItem.nulls}
                    props={referenceItem.props}
                  />
                )}
                <div className={styles.equals}>→</div>
                {item && (
                  <Item
                    title={"Жалкая пародия"}
                    name={item.name}
                    nulls={item.nulls}
                    props={item.props}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollItems);
