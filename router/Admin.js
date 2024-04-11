const router = require('express').Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');
const express = require('express');
const Application = require('../models/Application');


//See Admin Profile
router.get('/admin/:id', async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await User.findById(adminId);
        if (!admin) {
            return res.status(404).send('User not found');
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
});


//Creating new Admin
router.post('/new/admin', async (req, res) => {
    try {
        let admin = await Admin.findOne({
            email: req.body.email
        })

        if (admin) {
            return res.status(200).send('User already exists');
        } else {
            const { email, username, password, contact } = req.body;

            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            admin = await Admin.create({
                email: email, username: username, contact: contact, password: hash

            });
            const accessToken = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET);
            return res.status(200).json({ admin, accessToken })
        }
    } catch (error) {
        res.status(400).json('Internal Server Error');
        console.log(error);
    }
}
);


//Login for Admin
router.get('/login', async (req, res) => {
    try {
        let admin = await Admin.findOne({ email: req.body.email });
        if (admin) {
            const comaprePassword = bcrypt.compareSync(req.body.password, admin.password);
            if (!comaprePassword) {
                return res.status(400).send('Password is not correct');
            } else {
                accessToken = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET);
                res.status(200).json({ admin, accessToken });
            }

        } else {
            console.log('User not found');
        }

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}
);



//Create new Application
router.post('/new/application/:adminid', verifyToken, async (req, res) => {
    try {
        const adminId = req.params.adminid;
        const { title, description, salary, location, jobType } = req.body;
        const newApplication = await Application.create({
            title: title,
            description: description, 
            salary: salary, 
            location: location, 
            jobType: jobType, 
            admin: adminId
        });
        // await Admin.findOneAndUpdate({'_id':adminId}, {$push: {application: newApplication}});
        return res.status(201).json(newApplication);

    } catch (error) {
        res.status(500).json('Internal Server Error');
        console.log(error);
    }
}
);


//Update Application
router.put('/update/application/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, salary, location, jobType } = req.body;
        let application = await Application.findByIdAndUpdate(id, {
            title, description, salary, location, jobType
        });
        application = await Application.findById(id);
        return res.status(200).json(application);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


//Delete Application
router.delete('/delete/application/:id', verifyToken, async (req, res) => {
    try {
        const applicationId = req.params.id;
        await Application.findByIdAndDelete(applicationId); return res.status(200).json("Application Deleted");
    } catch (error) {
        res.status(500).json('Internal Server Error');
        console.log(error);

    }
}
);


//View all Applicants for a particular Application
router.get('/view/applicant/:id', verifyToken, async (req, res) => {
    try {
        const applicationId = req.params.id;
        const application = await Application.findById(applicationId);
        const applicantList = application.user.map(user => {
            return { user };
        });
        return res.status(200).json(applicantList);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}
);


//Remove Applicant from Application
router.patch('/applicant/:id/:applicantid', verifyToken, async (req, res) => {
    try {
        const applicationId = req.params.id;
        const applicantId = req.params.applicantid;
        let application = await Application.findById(applicationId);
        application.user.remove(applicantId);
        await application.save();
        return res.status(200).json('Applicant Removed');
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}
);


//Change Application Status from Available to Unavailable and vice versa
router.patch('/jobs/:id/status/change', verifyToken, async (req, res) => {
    try {
        const applicationId = req.params.id;
        let application = await Application.findById(applicationId);
        application.available = !application.available;
        await application.save();
        return res.status(200).json({ application, message: 'Status Changed' });

    } catch (error) {
        res.status(500).json('Internal Server Error');
        console.log(error)
    }
}
);


//View all Applications
router.get('/viewall/job/:adminid', verifyToken, async (req, res) => {

    try {
        const adminId = req.params.id;
        const applications = await Application.find(adminId);
        return res.status(200).json(applications);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
        console.log(error);
    }
}
);


module.exports = router;