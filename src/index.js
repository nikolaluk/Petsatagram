const express = require('express');
const app = express();
const PORT = 3000;

const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const dbConnect = require('./config/dbConfig');

const router = require('./routes');

expressConfig(app);
handlebarsConfig(app);

dbConnect()
    .then(() => console.log('DB connected succesfully'))
    .catch((err) => ('DB error', err.message));

app.use(router);

app.listen(PORT,() => console.log(`App listening on port ${PORT}`));