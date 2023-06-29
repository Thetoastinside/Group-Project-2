const express = require('express');
const app = express();
const mysql = require("mysql");
const PORT = 3001;

app.listen(PORT, () => {
    console.log("Serve Running");
});

