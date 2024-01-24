const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    designation: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Employee',employeeSchema);