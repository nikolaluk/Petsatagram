const router = require('express').Router();

const photoManager = require('../managers/photoManager');
const { userErrorMessage } = require('../utils/helpers')

const { isAuth } = require('../middlewares/auth');

//GET
router.get('/create', isAuth, async (req, res) => {
    res.render('photos/create');
});

router.get('/:id/details', async (req, res) => {
    try {
        const photo = await photoManager.getById(req.params.id);
        const isOwner = req.user?._id == photo.owner._id;
        
        res.render('photos/details', { photo, isOwner })
    } catch (err) {
        res.redirect('/404');
    }
});

router.get('/:id/edit', isAuth, async (req, res) => {
    try {
        const photo = await photoManager.getById(req.params.id);
        if (req.user?._id != photo.owner._id) {
            throw new Error("Not authorised")
        }
        res.render('photos/edit', { photo })
    } catch (err) {
        res.redirect('/404');
    }
});

router.get('/:id/delete', isAuth, async (req, res) => {
    try {
        const photo = await photoManager.getById(req.params.id);
        if (req.user?._id != photo.owner._id) {
            throw new Error("Not authorised")
        }
        await photoManager.deleteById(photo._id);
        res.redirect('/catalog')
    } catch (err) {
        console.log(err);
        res.redirect('/404');
    }
});

//POST
router.post('/create', isAuth, async (req, res) => {
    const { name, age, description, location, image } = req.body;
    const owner = req.user._id;
    try {
        await photoManager.create(name, age, description, location, image, owner);
        res.redirect('/catalog');
    } catch (err) {
        const error = userErrorMessage(err)[0];
        res.render('photos/create', { error });
    }
});

router.post('/:id/edit', isAuth, async (req, res) => {
    try {
        const photoData = req.body;
        const photo = await photoManager.getById(req.params.id);
        if (req.user?._id != photo.owner._id) {
            throw new Error("Not authorised")
        }
        await photoManager.updateById(req.params.id, photoData);
        res.redirect(`/photos/${photo._id}/details`);
    } catch (err) {
        const error = userErrorMessage(err)[0];
        res.render(`photos/edit`, { error });
    }
});

router.post('/:id/details', async (req, res) => {
    const { comment } = req.body;
    const id = req.params.id;

    const photo = await photoManager.getById(id);
    const commentList = photo.commentList;
    commentList.push({ user: req.user._id, comment: comment });
    await photoManager.updateById(id, {commentList});

    res.redirect(`/photos/${id}/details`);
});

module.exports = router;