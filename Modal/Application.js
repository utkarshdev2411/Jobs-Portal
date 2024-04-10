
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const jobSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required'],
        maxlength: 70,
    },

    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required'],
    },
    salary: {
        type: String,
        trim: true,
        required: [true, 'Salary is required'],
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
        // ref: "JobType",
        required: true
    },
    savedbyuser:[{
        type: String,
        // ref: "User",
        unique: true
    }],

    user: [{
        type: String,
        // ref: "User",
        unique: true
    }],
    admin: {
        type: String,
        ref: "Admin",
        required: true
    }



}, { timestamps: true })

module.exports = mongoose.model("Job", jobSchema);