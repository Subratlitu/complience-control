const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const { connectToMongo } = require('./config/mongoConnection');
const authRoutes = require('./routes/auth.routes'); 
const controlRoutes = require("./routes/control.routes")
const taskRoutes = require("./routes/task.routes")
const auditRoutes = require("./routes/audit.routes")


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectToMongo();

//  Route mounting
app.use('/api/auth', authRoutes);
app.use('/api/control', controlRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/audit', auditRoutes);




app.listen(3000, () => {
  console.log('Express app running on port 3000');
});
