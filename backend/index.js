const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());
const index = require('./routes/index');
const tutor = require('./routes/api/tutor');

app.use('/api/tutor', tutor);
app.use('/',index);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

