const express = require('express');
const router = express.Router();

const EmployeeModel = require('../models/empschema');
const empschema = require('../models/empschema');

// <===============Get routes starts here===============>

router.get('/', function(req, res) {
    EmployeeModel.find({})
        .then(employees => {
            res.render('index', {employees: employees});
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/new', function(req, res) {
    res.render('addnew');
});

// <===============Search routes===============>

router.get('/search', function(req, res) {
    res.render('search', {empschema: ""});
});

router.get('/employee', function(req, res) {
    const searchQuery = {name: req.query.name};

    EmployeeModel.findOne(searchQuery)
    .then(empschema => {
        res.render('search', {empschema: empschema});
    })
    .catch(err => {
        console.log(err);
    });
});

// <===============Update routes===============>

router.get('/update', function(req, res) {
    res.render('update');
});

router.get('/update/:id', function(req, res){
    let searchQuery = {_id : req.params.id};

    EmployeeModel.findOne(searchQuery)
    .then(empschema => {
        res.render('update', {empschema: empschema});
    })
    .catch(err => {
        console.log(err);
    })
});

router.put('/update/:id', function(req, res){
    let searchQuery = {_id : req.params.id};

    EmployeeModel.updateOne(searchQuery, { $set: {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary
    }})
    .then(empschema => {
        req.flash('success_msg','Employee updated successfully.');
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });
});

// <===============Delete routes===============>

router.delete('/delete/:id', function(req, res){
    let searchQuery = {_id : req.params.id};

    EmployeeModel.deleteOne(searchQuery)
    .then(empschema => {
        req.flash('success_msg','Employee deleted from database successfully.');
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });
});

// <===============Post routes starts here===============>
// <===============Add new employee===============>

router.post('/new', function(req, res) {
    let employeedata = {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary
    }

    EmployeeModel.create(employeedata)
        .then(EmployeeModel =>{
            req.flash('success_msg','Employee added to database successfully.');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;