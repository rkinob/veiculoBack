
const express = require('express');
const router = express.Router();
const marcaEndPoint = require('../endpoints/marcaEndPoints');


router.get('/', marcaEndPoint.getAll);
router.get('/:id', marcaEndPoint.getById);
router.post('/', marcaEndPoint.create);
router.put('/:id', marcaEndPoint.update);
router.delete('/:id', marcaEndPoint.delete);


module.exports = router;
