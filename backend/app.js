const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let db = [
    {
        "code": "Julia",
        "data": ["a", "b", "c"]
    }
]

app.get('/', (req, res) => {
    console.log(req.query)
    if (req.query.code) {
        for (let i = 0; i < db.length; i++) {
            if (db[i].code == req.query.code) {
                res.send(db[i])
            }
        }
    }
})
app.post('/', (req, res) => {
    if (req.body) {
        for (let i = 0; i < db.length; i++) {
            if (db[i].code == req.body.code) {
                db[i].data = db[i].data.concat(req.body.data)
                res.send(db)
            }
        }
    }
})

app.listen(8080, () => console.log("app is working on port 8080"))