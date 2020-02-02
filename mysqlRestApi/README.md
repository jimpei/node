# 概要
node, expressを使用した簡単RESTful API
DB：JawsDB(mysql)
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

# Heroku上のアプリにHeroku Postgresを導入
「Resources > Find more add-ons > JawsDB mysql」の順に移動。
「Install Heroku Postgres」でインストール。
「Hobby Dev」という無料プランを選択。
Heroku Postgresを導入するアプリケーションを選択し、「Provision addo-ons」をクリック。
導入完了

## heroku上のmysqlにアクセス
```
$ mysql -u [username] -p -h [hostname] --port 3306
```

## DB作成
```
create table user (id int, name varchar(10));
INSERT INTO user (id, name) VALUES (1, 'taro');
INSERT INTO user (id, name) VALUES (2, 'jiro');

```

## 接続情報の取得
```
https://dashboard.jawsdb.com/mysql/dashboard
Host, Database, User, Port, Passwordなどの情報が入手できる
```

## 接続情報を環境変数に設定
```
$ heroku config:set ENV_HOST=xxxxxxxxxxxxxxxx --app pj-name
$ heroku config:set ENV_DB=xxxxxxxxxxxxxxxx --app pj-name
$ heroku config:set ENV_USER=xxxxxxxxxxxxxxxx --app pj-name
$ heroku config:set ENV_PASSWORD=xxxxxxxxxxxxxxxx --app pj-name
$ heroku config:set ENV_PORT=xxxxxxxxxxxxxxxx --app pj-name

# 取得
$ heroku config
$ heroku config:get ENV_HOST -a pj-name

# 削除
$ heroku config:unset ENV_HOST -a pj-name
```
