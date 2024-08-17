const express = require('express');
const { handleGenerateNewShortUrl , handleGetNewShortUrl , handleGetAnalytics } = require('../controllers/index');
const router = express.Router();

router.post('/', handleGenerateNewShortUrl);
router.get('/:shortId', handleGetNewShortUrl);
router.get('/analytics/:shortId', handleGetAnalytics);
module.exports = router;
