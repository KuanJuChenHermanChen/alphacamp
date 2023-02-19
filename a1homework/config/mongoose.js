const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
})

const db = mongoose.connection

//當連線失敗時執行
db.on('error', (err) => {
  console.log('Mongoose 連線失敗：' + err)
})

//當連線成功時執行
db.once('open', () => {
  console.log('Mongoose 連線成功')
})

// 當程式中斷時，關閉連線
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose 連線中斷，程式結束！');
    process.exit(0);
  });
});

module.exports = db