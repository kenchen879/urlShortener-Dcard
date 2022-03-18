// 載入 Mongoose 和 dotenv dependencies
const mongoose = require('mongoose');
// 利用 dotenv 讓路徑在配置中傳送，因 .env 不在根目錄中。通過這個傳送 .env 的位置
require('dotenv').config({ path: './config/.env' });

// 利用非同步function connectDB，連接資料庫到 app
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('資料庫已連接');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
