module.exports = app => {

var express = require('express');
var router = express.Router();
var eventController = require('../controllers/eventController.js');

/*
 * GET
 */
router.get('/vseDogodke', eventController.list);

/*
 * GET
 */
router.get('/:id', eventController.show);

/*
 * POST
 */
router.post('/dodajEvent', eventController.create);

/*
 * PUT
 */
router.put('/:id', eventController.update);

/*
 * DELETE
 */
router.delete('/:id', eventController.remove);
app.use("/event", router);

}