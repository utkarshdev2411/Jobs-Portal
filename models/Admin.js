const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true

    },
    contact: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    },

    application: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application'
        }
    ]

}, { timestamp: true });

module.exports = mongoose.model('Admin', AdminSchema);