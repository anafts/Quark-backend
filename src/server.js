// express 
const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);


// port 3000 
app.listen(80, () => console.log("Server is running"));