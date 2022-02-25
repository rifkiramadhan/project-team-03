# Perintah Sequelize

## Membuat Table

- npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string,salt:string,birthdate:date,gender:string,avatar:string,type:string --force

- npx sequelize-cli model:generate --name Products --attributes name:string,desc:string,price:string,stock:integer,expire_date:date,weight:integer,category:string,brand:string,condition:string,total_sold:integer,rating:integer,views:integer,UserId:integer --force

- npx sequelize-cli model:generate --name Products_Image --attributes filename:string,filesize:string,filetype:string,primary:boolean,ProductId:integer --force

- npx sequelize-cli model:generate --name Shopping_Cart --attributes created_on:date,status:string,UserId:integer --force

- npx sequelize-cli model:generate --name Order --attributes name:string,created_on:date,subtotal:integer,discount:integer,tax:integer,total_due:integer,total_qty:integer,payt_trx_number:string,city:string,address:string,status:string,UserId:integer --force

- npx sequelize-cli model:generate --name Line_Item --attributes qty:integer,status:string,ProductId:integer,ShoppingCartId:integer,OrderId:integer --force

- npx sequelize-cli db:migrate

## Perintah Sequelize Untuk Undo Table dan Database

- npx sequelize-cli db:migrate:undo:all
- npx sequelize-cli db:migrate:undo
- npx sequelize-cli db:undo
