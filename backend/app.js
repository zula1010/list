const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors)

let db = [
    {
        "code": "Julia",
        "data": ["a", "b", "c"]
    }
]

app.get('/:code', (req, res) => {
    console.log("huselt irev")
    if (req.params.code) {
        for (let i = 0; i < db.length; i++) {
            if (db[i].code == req.params.code) {
                // console.log(db[i])
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