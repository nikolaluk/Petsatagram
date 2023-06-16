const router = require('express').Router();

const userManager = require('../managers/userManager');

const { userErrorMessage } = require('../utils/helpers')

//GET
router.get('/login', (req, res) => {
    res.render('users/login');
});

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.get('/logout', (req,res) => {
    res.clearCookie('token');
    res.redirect('/');
});

//POST
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try{
        const token = await userManager.login(username,password);
        res.cookie('token',token);
        res.redirect('/');
    } catch(err) {
        const error = userErrorMessage(err)[0];
        res.render('users/login', { error });
    }
});

router.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    try {
        await userManager.register(username, email, password, repeatPassword);

        const token = await userManager.login(username,password);
        res.cookie('token',token);

        res.redirect('/')
    } catch (err) {
        const error = userErrorMessage(err)[0];
        res.render('users/register', { error });
    }
});

module.exports = router;