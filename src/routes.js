const router = require('express').Router();

const homeController = require('./controllers/homeController');
const photoController = require('./controllers/photoController');
const userController = require('./controllers/userController');

router.use(homeController);
router.use('/users', userController);
router.use('/photos', photoController);

router.get('*', (req, res) => {
    res.render('404');
})

module.exports = router;