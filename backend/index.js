const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser")
const mysql = require("mysql")

const add = express();
add.use(cors());
add.use(bodyparser.json());
add.use(express.json());
add.use(bodyparser.urlencoded({ require: true }));
add.use(express.static("public"));


const con = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "Hari@iphone6",
    database: "ford"
})

con.connect(function (error) {

    if (error) {

        console.log(error)
    } else {

        console.log("connection successfull")
    }
})

add.get('/api/sales', (req, res) => {
    con.query('SELECT * FROM car_sales', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

add.listen(3081, () => {
    console.log("running on port 3081");
})