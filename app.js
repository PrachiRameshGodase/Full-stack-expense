const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const sequelize=require('./util/database')
const router = express.Router();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


const appointRoutes = require('./routes/expenses');
app.use('/', appointRoutes);


sequelize.sync().then(result=>{
  console.log(result)
  app.listen(3000);
}).catch(err=>{
  console.log(err)
})