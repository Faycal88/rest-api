const express = require('express');
const router = express.Router()
const user = require('../models/User')
router.use(express.json())

router.get("/", async (req, res) => {
    try {
        const users = await user.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err })
    }

});

router.post('/', async (req, res) => {
    req.header('Content-Type', 'application/json')
    const newUser = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(400).json({ message: err })
    }

});

router.get('/:id', getUser, (req, res) => {
    res.send(res.user)
});
    


router.patch('/:id',getUser, async (req, res) => {
    if(req.body.name != null){
        res.user.name = req.body.name
    }
    if(req.body.email != null){
        res.user.email = req.body.email
    }
    if (req.body.password != null) {
        res.user.password = req.body.password
    }
    res.user.updatedate = new Date();
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (error) {
        res.status(400).json({ message: "cannot update user" })
    }
});

router.delete('/:id',getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'User deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});


async function getUser(req, res, next) {
    let foundUser;
    try {
        foundUser = await user.findById(req.params.id)
        if (foundUser === null) {
            return res.status(404).json({ message: 'User not found' })
        }
    } catch (err) {
        return res.status(500).json({ message: "cannot get user" })
    }
    res.user = foundUser
    next()
}

module.exports = router;