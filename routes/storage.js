const express = require('express');
const { createItem, getItems, getItem, deleteItem } = require('../controllers/storage');
const uploadMiddleware = require('../utils/handleStorage');
const { validatorGetItem } = require('../validators/storage');
const router = express.Router();

/**
 * Create a new item
 */
router.post('/', uploadMiddleware.single('myfile'), createItem);

/**
 * Read list of items stored
 */
router.get('/', getItems);

/**
 * Read details of item stored
 */
router.get('/:id', validatorGetItem, getItem);

/**
 * Delete item stored
 */
router.delete('/:id', validatorGetItem, deleteItem);

module.exports = router;
