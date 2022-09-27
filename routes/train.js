const express = require('express')
const router = express.Router();
const trainController = require('../controllers/train');

router.post('/train/checkrezervation', trainController.checkRezervation);

module.exports = router;