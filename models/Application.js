const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        require: [true, 'Title is required'],
        maxlength: 70,
    },

    description: {
        type: String,
        trim: true,
        require: [true, 'Description is required'],
    },
    salary: {
        type: String,
        trim: true,
        require: [true, 'Salary is required'],
    },
    location: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true
    },
    jobType: {
        type: String,
        require: true
    },
    savedbyuser: [{
        type: String,
        require: false
    }],

    user: [{
        type: String,
        unique: true
    }],
    admin: {
        type: String,
        require: true
    }

}, { timestamps: true })

module.exports = mongoose.model("Job", jobSchema);