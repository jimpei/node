# 概要
node, expressを使用した簡単RESTful API
DBは利用していない(内部データを利用)

axiosで外部APIを実行し、その結果を返す

外部接続先には下記を利用している
https://jsonplaceholder.typicode.com/

# 起動
```
$ node index.js

or

$node run start

or

# 変更を即時反映できる
$ nodemon index.js
```
# curl
```
$ curl -X GET http://localhost:3000/api/courses | jq

$ curl -X POST http://localhost:3000/api/courses -H "Accept: application/json" -H "Content-type: application/json" -d '{ "name" : "tanaka" }'

$ curl -X PUT http://localhost:3000/api/courses/4 -H "Accept: application/json" -H "Content-type: application/json" -d '{ "name" : "yamamoto" }'

$ curl -X DELETE http://localhost:3000/api/courses/2
```

# herokuへデプロイ
```
$ heroku login
$ heroku git:remote -a pj-name
$ git push heroku master

```
# herokuから削除
```
$ heroku git:remote -a pj-name
```
