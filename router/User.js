const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');
const express = require('express');
const Application = require('../models/Application');
const mongoose = require('mongoose');




//Creating new USER
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


//Login for USER
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

//See user Details
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

//Update USER
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


//View all jobs
router.get('/viewall/job', verifyToken, async (req, res) => {
    try {
        const applications = await Application.find();

        const applicationList = applications.map(application => {
            const { title, description, salary, location, jobType, id } = application;
            return { title, description, salary, location, jobType, id };
        });
        return res.status(200).json(applicationList);
    } catch (error) {
        res.status(500).send('Internal Server Error');
        console.log(error);
    }
});


//Apply for a job
router.put('/apply/job/:jobid/:userid', verifyToken, async (req, res) => {
    try {
        const jobId = req.params.jobid;
        const user = await req.params.userid;
        let application = await Application.findByIdAndUpdate(jobId, {
            $addToSet: { user: user }

        });
        application = await Application.findById(jobId);
        return res.status(200).json(application);


    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}
);


//Save a job
router.put('/save/job/:id', verifyToken, async (req, res) => {
    try {
        const jobId = req.params.id;
        const user = await req.user.id;
        let application = await Application.findByIdAndUpdate(jobId, {
            $addToSet: { savedbyuser: user }

        });
        application = await Application.findById(jobId);
        return res.status(200).json(application);


    } catch (error) {
        res.status(500).send('Internal Server Error');
        console.log(error);
    }
}
);


//View my applications
router.get('/view/my/application', verifyToken, async (req, res) => {
    try {
        const user = await req.user.id;
        const application = await Application.find({ user: user });
        return res.status(200).json(application);
    } catch (error) {
        res.status(500).send('Internal Server Error');
        console.log(error);
    }
}
);


//Search for a job
router.get("search/job", verifyToken, async (req, res) => {
    try {
        const { title, location, jobType } = req.body;
        const application = await Application.find({
            title: title,
            location: location,
            jobType: jobType
        });
        return res.status(200).json(application);
    } catch (error) {
        res.status(500).send('Internal Server Error');
        console.log(error);
    }
}
);


module.exports = router;