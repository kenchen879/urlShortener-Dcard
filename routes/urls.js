// 載入 packages
const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const Url = require('../models/Url');
const utils = require('../utils/utils');
require('dotenv').config({ path: '../config/.env' });

// 將原始 URL 建立一個短 URL 並存儲在資料庫中
router.post('/v1/urls', async (req, res) => {
  const { origUrl, expireAt } = req.body;
  const base = process.env.BASE;
  
  const urlId = shortid.generate();
  if (utils.validateUrlFormat(origUrl)) {
    try {
      let url = await Url.findOne({ origUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = `${base}/${urlId}`;

        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          expireAt,
          date: new Date()
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error / 伺服器錯誤');
    }
  } else {
    res.status(400).json('Error: Invalid Url or expireTime / Url或過期時間格式錯誤');
  }
});

module.exports = router;
