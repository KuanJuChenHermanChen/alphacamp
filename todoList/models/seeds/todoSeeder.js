const mongoose = require('mongoose')
const Todo = require('../todo') // 載入 todo model

if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

// 當連線成功時執行
mongoose.connection.on('connected', function () {
  console.log('Mongoose 連線成功！');
  // 新增種子資料
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: 'name-' + i })
  }
});

// 當連線失敗時執行
mongoose.connection.on('error', function (err) {
  console.log('Mongoose 連線失敗：' + err);
});

// 當斷開連線時執行
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose 連線斷開！');
});

// 當程式中斷時，關閉連線
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose 連線中斷，程式結束！');
    process.exit(0);
  });
});