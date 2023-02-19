const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')
const restaurantList = require('../../restaurant.json')

//當連線成功時執行
db.once('connected', async function () {
  // 確認資料庫是否為空，若是則新增種子資料
  const counts = await Restaurant.countDocuments()
  if (counts === 0) {
    console.log('資料庫為空，開始新增種子資料')
    for (let i = 0; i < restaurantList.results.length; i++) {
      await Restaurant.create({
        id: restaurantList.results[i].id,
        name: restaurantList.results[i].name,
        name_en: restaurantList.results[i].name_en,
        category: restaurantList.results[i].category,
        image: restaurantList.results[i].image,
        location: restaurantList.results[i].location,
        phone: restaurantList.results[i].phone,
        google_map: restaurantList.results[i].google_map,
        rating: restaurantList.results[i].rating,
        description: restaurantList.results[i].description
      })
    }
    console.log('資料庫已新增種子資料')
    db.close()
  } else {
    console.log('資料庫已有種子資料，無需再新增')
    db.close()
  }
})
