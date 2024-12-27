const express = require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 5000;

// general middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get('/', (req, res) => {
    res.json({
        message: 'working'
    });
});

// db connect and start server
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    // connect to db
    console.log("connected to mongodb");
    // then start server
    app.listen(port, () => console.log(`server is running on port ${port}`));
})
.catch(error => console.log(`mongodb error: ${error}`));
