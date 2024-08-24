const express = require('express');
const router = express.Router();
const { getFunds, createFund, updateFund, deleteFund } = require('../controllers/fundController');

router.get('/', getFunds);
router.post('/', createFund);
router.put('/:id', updateFund);
router.delete('/:id', deleteFund);

module.exports = router;