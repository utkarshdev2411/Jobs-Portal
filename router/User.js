const router = require('express').Router();
const User = require('../Modal/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');
const express = require('express');
const Application = require('../Modal/Application');

router.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
});


router.post('/new/user', async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.email
        })

        if (user) {
            return res.status(200).send('User already exists');
        } else {
            const { email, username, password, contact } = req.body;
            console.log(email,
                username,
                password,
                contact);
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            user = await User.create({
                email: email, username: username, contact: contact, password: hash

            });
            const accessToken = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
            return res.status(200).json({ user, accessToken })
        }
    } catch (error) {
        return res.status(400).send('Internal Server Error');
    }
}
);



router.get('/login', async (req, res) => {
    try {
        let user = await User.findOne({
            email: req
                .body.email
        });
        if (user) {
            const comaprePassword = bcrypt.compareSync(req.body.password, user.password);
            if (!comaprePassword) {
                return res.status(400).send('Password is not correct');
            } else {
                accessToken = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
                res.status(200).json({ user, accessToken });
            }

        }

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}
);

router.put('/update/user', verifyToken, async (req, res) => {

    try {
        const { email, username, password, contact } = req.body;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        let user = await User.findByIdAndUpdate(req.user.id, {
            email: email, username: username, contact: contact, password: hash
        });
        user = await User.findById(req.user.id);
        return res.status(200).json(user);

    } catch (error) {
        res.status(500).send('Internal Server Error');
        console.log(error);

    }
}
);

router.put("/apply/job/:id", verifyToken, async (req, res) => {
    try {
        const jobId = req.params.id;
        
        
        
    } catch (error) {
        res.status(500).send('Internal Server Error');
        console.log(error);
    }
}
);



module.exports = router;