const Joi = require('joi');
const mongoose = require('mongoose');
const route = require('../test/route.js');
const bodyparser = require('body-parser');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/testusers')
.then( () => console.log('Connected to MongoDB...'))
.catch(err => console.log('Did not connect to MongoDB...'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyparser());
app.use('/api/login',route);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listenining on port ${port}...`));