const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use(cors)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
let db = [
    {
        "code": "Julia",
        "data": ["a", "b", "c"]
    }
]

app.get('/', (req, res) => {

    console.log("get huselt irev")
    if (req.query.code) {
        for (let i = 0; i < db.length; i++) {
            if (db[i].code == req.query.code) {
                // console.log(db[i])
                res.json(db[i])
            }
        }
    }
})
app.post('/', (req, res) => {
    console.log("post huselt irev")
    if (req.body) {
        console.log(req.body)
        for (let i = 0; i < db.length; i++) {
            if (db[i].code == req.body.code) {
                db[i].data.push(req.body.addValue)
                console.log(db[i])
                res.json(db[i])
            }
        }
    }
})

app.listen(3030, () => console.log("app is working on port 3030"))