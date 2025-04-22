
const express = require('express');
const router = express.Router();
const modeloEndPoint = require('../endpoints/modeloEndPoints');

router.get('/', modeloEndPoint.getAll);
router.get('/:id', modeloEndPoint.getById);
router.post('/', modeloEndPoint.create);
router.put('/:id', modeloEndPoint.update);
router.delete('/:id', modeloEndPoint.delete);

module.exports = router;
