const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({ type: "*/*" }));

app.use(cors());
const tutor = require('./routes/api/tutor');
const newuser = require('./routes/api/newuser');
const tutee = require('./routes/api/tutee');

app.use('/api/tutor', tutor);
app.use('/api/newuser',newuser);
app.use('/api/tutee', tutee);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

