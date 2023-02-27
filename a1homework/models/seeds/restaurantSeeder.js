const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')
const restaurantList = require('../../restaurant.json')

//當連線成功時執行
db.once('connected', async function () {
  // 確認資料庫是否為空，若是則新增種子資料
  const counts = await Restaurant.countDocuments()
  if (counts === 0) {
    console.log('資料庫為空，開始新增種子資料')
    await Restaurant.create(restaurantList.results)
    console.log('資料庫已新增種子資料')
  } else {
    console.log('資料庫已有種子資料，無需再新增')
  }
})
