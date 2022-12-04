// express 
const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);


// port 80
app.listen(process.env.PORT ?? 80, () => console.log("Server is running"));