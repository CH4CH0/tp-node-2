const { Router } = require('express');
const router = Router();
const authors = require('./author.router.js');
const books = require('./book.router.js');

router.use('/api', authors);
router.use('/api', books);


module.exports = router;