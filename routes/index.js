const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

router.get('/:urlId', async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    const expiredTime = url.expireAt;
    const now = Date.now();
    if (now < Date.parse(expiredTime)) {
      if (url) {
        url.clicks++;
        url.save();
        return res.redirect(url.origUrl);
      } else res.status(404).json('Not found / 該短連結不存在'); 
    } else{
      res.status(404).json('Not found / 該短連結已過期');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error / 伺服器錯誤');
  }
});

module.exports = router;
