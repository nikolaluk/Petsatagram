const router = require('express').Router();

const photoManager = require('../managers/photoManager');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/catalog', async (req, res) => {
    const photos = await photoManager.getAll();

    res.render('catalog', {photos})
});

module.exports = router;