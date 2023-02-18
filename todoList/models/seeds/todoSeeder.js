const mongoose = require('mongoose')
const Todo = require('../todo') // 載入 todo model

if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

// 當連線成功時執行
mongoose.connection.once('connected', async function () {
  console.log('Mongoose 連線成功！');
  // 確認資料庫是否為空，若是則新增種子資料
  const counts = await Todo.countDocuments()
  if (counts === 0) {
    // 新增種子資料
    for (let i = 0; i < 10; i++) {
      await Todo.create({ name: 'name-' + i })
      console.log('種子資料新增成功！');
    }
  } else {
    console.log('資料庫已有資料，不需新增種子資料！')
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

