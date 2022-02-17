require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path')
const cors = require('cors')

app.use(cors())
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/tmp/my-uploads',express.static(path.join(__dirname,'/tmp/my-uploads')))

const routes = require('./routes');
app.use(routes);

app.listen(PORT, () => {
    console.log('Listening on port : ', PORT);
})