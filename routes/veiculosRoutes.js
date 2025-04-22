const express = require('express');
const router = express.Router();
const veiculoEndPoint = require('../endpoints/veiculoEndPoints');

router.get('/', veiculoEndPoint.getAll);
router.get('/:id', veiculoEndPoint.getById);
router.post('/', veiculoEndPoint.create);
router.put('/:id', veiculoEndPoint.update);
router.delete('/:id', veiculoEndPoint.delete);

module.exports = router;
