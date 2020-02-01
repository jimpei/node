# 概要
node, expressを使用した簡単RESTful API
DBは利用していない(内部データを利用)

# 起動
nodemon index.js

# curl
```
$ curl -X GET http://localhost:3000/api/courses | jq

$ curl -X POST http://localhost:3000/api/courses -H "Accept: application/json" -H "Content-type: application/json" -d '{ "name" : "tanaka" }'

$ curl -X PUT http://localhost:3000/api/courses/4 -H "Accept: application/json" -H "Content-type: application/json" -d '{ "name" : "yamamoto" }'

$ curl -X DELETE http://localhost:3000/api/courses/2
```
