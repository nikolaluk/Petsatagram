const router = require('express').Router();

const userManager = require('../managers/userManager');
const photoManager = require('../managers/photoManager');

const { userErrorMessage } = require('../utils/helpers');

const { isAuth } = require('../middlewares/auth');

//GET
router.get('/login', (req, res) => {
    res.render('users/login');
});

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

router.get('/:id/profile', async (req,res) => {
    const photos = await photoManager.getAll();
    const user = await userManager.getOne(req.params.id);
    let ownedPhotos = [];

    for(const photo of photos){
        console.log(user)
        if(photo.owner._id.toString() == user._id.toString()){
            console.log('in');
            ownedPhotos.push(photo);
        }
    }
    console.log(ownedPhotos);
    res.render('users/profile',{ user, ownedPhotos });
});

//POST
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await userManager.login(username, password);
        res.cookie('token', token);
        res.redirect('/');
    } catch (err) {
        const error = userErrorMessage(err)[0];
        res.render('users/login', { error });
    }
});

router.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    try {
        await userManager.register(username, email, password, repeatPassword);

        const token = await userManager.login(username, password);
        res.cookie('token', token);

        res.redirect('/')
    } catch (err) {
        const error = userErrorMessage(err)[0];
        res.render('users/register', { error });
    }
});

module.exports = router;