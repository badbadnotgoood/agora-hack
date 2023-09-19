# LPrediction
В этом репозитории находится модуль ML, API и Frontend
## ML🤖

![ezgif-4-b75a4e4f84](https://user-images.githubusercontent.com/83156020/185787255-c8260a9a-413b-4be2-a049-86e14bd2910a.gif)

![image](https://user-images.githubusercontent.com/83156020/185787558-60403bec-6fa4-437a-8e1b-f46c69531112.png)

![image](https://user-images.githubusercontent.com/83156020/185787569-5fb6dc65-54aa-46e0-b72d-934d85bf6371.png)

![image](https://user-images.githubusercontent.com/83156020/185787802-ae9af800-34e4-430d-98e2-1146043777ef.png)

![image](https://user-images.githubusercontent.com/83156020/185787812-2cb855a7-1b4f-4d37-91fc-ece537a96021.png)


http://51.250.29.0:8000/web/dots.html

## API📬

API работает с Docker контейнерами, в которых прописаны зависимости и особенности сборки бэкенд части нашего сервиса. API представляет методы для получения списка товаров, результата поиска эталонов и эталонных характеристик для различных товаров.
API написано на языке Python и является кроссплатформенным, то есть может быть запущено в различных окружениях. 

![image](https://user-images.githubusercontent.com/32881349/185777683-9babaca0-7cb8-4bda-847e-d98a01e2211c.png)

Приведён скриншот страницы документации к API сервиса (http://51.250.29.0:8000/docs)

#### Запрос на получение эталонов на 100 товаров выполняется и возращает ответ в среднем за 0.6 секунды⏱

# Сборка проекта🔧
<b> На Windows
```
docker pull exppi/dockerhub:agora-hack-windows
```
```
docker run -i -t -p 0.0.0.0:8000:8000 -d exppi/dockerhub:agora-hack-windows
```
</b>

<b> На Linux
```
docker pull exppi/dockerhub:agora-hack-linux
```
```
docker run -i -t -p 0.0.0.0:8000:8000 -d exppi/dockerhub:agora-hack-linux
```
</b>

И перейти по ссылке: http://localhost:8000/doc


![image](https://user-images.githubusercontent.com/32881349/185777289-a7e22cbf-a786-455c-a787-b5999457555a.png)

http://51.250.29.0/
