const express = require('express');
const app = express();
const connectDB = require('./config/db');
require('dotenv').config({ path: './config/.env' });

connectDB();

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', require('./routes/index'));
app.use('/api', require('./routes/urls'));

// 利用listen function 監聽並設置 server
const PORT = 80;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
