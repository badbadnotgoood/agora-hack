import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Spin } from "antd";
import { Upload } from "antd";
import ScrollItems from "./components/scroll-items";
import axios from "axios";
import uploadIcon from "./media/upload.svg";
import styles from "./styles.css";

const { Dragger } = Upload;

const url = 'http://192.168.0.119'; // Нужно поменять на адрес сайта с бэком
const port = "8000"; // Ну если порт поменяете, то пишем сюда

const url_default = `${url}:${port}/web`;
const url_random = `${url}:${port}/web/sample`;

export const Controller = (props) => {
  const [LoaderStatus, setLoaderStatus] = useState(false);
  const [RequestStatus, setRequestStatus] = useState(false);
  const [data, setData] = useState([]);
  const [uploadData, setUploadData] = useState(null);

  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    setUploadData(event.target.result);
  });

  const mock = [
    {
      id: "d7edb35aee64cc0b",
      name: "Встраиваемая стиральная машина Bosch WIW-24340oe",
      props: [
        "Защита от протечек, от детей, от скачков питания",
        "Скорость   отжима\t1200 об/мин",
        "Доп.функции  контроль за уровнем пены, интеллектуальное управление стиркой, выбор скорости отжима, выбор температуры стирки, сигнал окончания стирки, контроль баланса",
      ],
    },
  ];

  const SendRequest = (url, data = null, method = 0) => {
    setData([]);
    setLoaderStatus(true);
    if (method === 0) {
      axios
        .post(url, data)
        .then(({ data }) => {
          setData(data);
          setRequestStatus(true);
          setLoaderStatus(false);
        })
        .catch(() => {
          setData(mock);
          setRequestStatus(true);
          setLoaderStatus(false);
        });
    } else {
      axios
        .get(url)
        .then(({ data }) => {
          setData(data);
          setRequestStatus(true);
          setLoaderStatus(false);
        })
        .catch(() => {
          setData(mock);
          setRequestStatus(true);
          setLoaderStatus(false);
        });
    }
  };

  useEffect(() => {
    if (uploadData !== null) {
      setLoaderStatus(true);
      const data = JSON.parse(uploadData);
      SendRequest(url_default, data);
    }
  }, [uploadData]);

  const uploadProps = {
    name: "file",
    multiple: false,
    accept: ".json",
    withCredentials: true,

    customRequest({ file }) {
      reader.readAsText(file);
    },

    onChange(info) {
      const { status } = info.file;
      setLoaderStatus(true);

      if (status !== "uploading") {
        setLoaderStatus(true);
      }

      if (status === "done") {
        setLoaderStatus(true);
      } else if (status === "error") {
        console.log("error");
      }
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.button__container}>
          <button
            className={styles.button}
            onClick={() => {
              setRequestStatus(false);
              SendRequest(url_random, null, 1);
            }}
          >
            Тестовый запуск
          </button>
          <button
            className={styles.button}
            onClick={() => {
              setRequestStatus(false);
            }}
          >
            Сбросить
          </button>
        </div>
        {RequestStatus ? (
          <ScrollItems list={data} />
        ) : LoaderStatus ? (
          <Spin size="large" wrapperClassName={styles.spin} />
        ) : (
          <Dragger {...uploadProps}>
            <p
              className="ant-upload-drag-icon"
              style={{ alignItems: "center" }}
            >
              <img
                src={uploadIcon}
                alt="upload-icon"
                className={styles["upload-icon"]}
              />
            </p>
            <p className="ant-upload-text" style={{ padding: "0 20px" }}>
              Нажмите или перетащите файл в эту область, чтобы загрузить
            </p>
          </Dragger>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
