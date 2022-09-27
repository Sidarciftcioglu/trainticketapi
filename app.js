const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const {get404Page} = require('./controllers/error')
const env = require("./utility/env");
const {SetHeaderIpAddress} = require("./utility/func");
const trainRoutes = require('./routes/train');

app.listen(env.port, () => console.log(`listening port ${env.port} => ${env.siteUrl}`));

app.use(cors());

app.use(SetHeaderIpAddress);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(trainRoutes);
app.use(get404Page);