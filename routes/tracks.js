const express = require('express');
const {
	getItems,
	createItem,
	getItem,
	updateItem,
	deleteItem,
} = require('../controllers/tracks');
const checkRole = require('../middlewares/role');
const authMiddleware = require('../middlewares/session');
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks');
const router = express.Router();

// TODO: generate http://localhost:3000/api/tracks -> GET,POST DELETE PUT

/**
 * Create a new track
 */
router.post(
	'/',
	authMiddleware,
	checkRole(['admin', 'user']),
	validatorCreateItem,
	createItem
);

/**
 * Read list of tracks
 */
router.get('/', authMiddleware, checkRole(['admin', 'user']), getItems);

/**
 * Read details of a track
 */
router.get('/:id', authMiddleware, validatorGetItem, getItem);

/**
 * Update a track
 */
router.put('/:id', authMiddleware, validatorGetItem, validatorCreateItem, updateItem);

/**
 * Delete a track
 */
router.delete('/:id', authMiddleware, validatorGetItem, deleteItem);

module.exports = router;
