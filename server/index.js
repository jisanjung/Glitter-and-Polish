const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

// general middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get('/', (req, res) => {
    res.json({
        message: 'working'
    });
});

app.listen(port, () => console.log(`server is running on port ${port}`));
