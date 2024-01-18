const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');

app.use(express.json());
app.use(cors());




db.sequelize.sync().then(()=>{
    app.listen(8080, ()=>{
        console.log("Server running on post 8080")
    });
});