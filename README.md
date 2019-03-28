# phql
Convert a string of a specific format to the data filter parameter form of MongoDB.
## English
### Installation
```NodeJs
yarn add phql
```
### Usage
Usually used for client dynamic acquisition of required fields in web applications.
```NodeJs
let parseQl = require('phql');
let filterObj = parseQl('{name,age,sex,info{weight,height}}')
```
### Specific Format String
```
{name,age,sex,info{weight,height}}
```
### Parsed Result
`MongoDB` [projections](http://mongodb.github.io/node-mongodb-native/3.2/tutorials/projections/ "projections")
```javascript
{
  name: 1,
  age: 1,
  sex: 1,
  info: {
    weight: 1,
    height: 1
  }
}
```
## 简体中文
通常用于在使用 `MongoDB` 的 `WEB` 应用程序中，客户端动态获取自己所需要的字段；这个时候客户端可以传递特定格式的字符串，然后服务端解析该字符串为 `MongoDB Projections` 的形式传递给 `MongoDb` 。
# License
[MIT](https://github.com/DvShu/phql/blob/master/LICENSE "MIT")



