const express = require('express');
const {handleGenerateShortUrl, handleGetShortUrl} = require('../controllers/url')
const router = express.Router();

router.post('/', handleGenerateShortUrl);
router.get('/url/:shortId', handleGetShortUrl)

module.exports = router;