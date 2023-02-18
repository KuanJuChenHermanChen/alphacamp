const Todo = require('../todo')
const db = require('../../config/mongoose')

// 當連線成功時執行
db.once('connected', async function () {
  // 確認資料庫是否為空，若是則新增種子資料
  const counts = await Todo.countDocuments()
  if (counts === 0) {
    for (let i = 0; i < 10; i++) {
      await Todo.create({ name: 'name-' + i })
      console.log('種子資料新增成功！');
      await db.close()
    }
  } else {
    console.log('資料庫已有資料，不需新增種子資料！')
    db.close()
  }
});
