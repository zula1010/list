const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session');

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({ secret: "Julia" }));

let db = {};



app.get('/', async (req, res) => {
    console.log("get huselt irev")
    if (req.query.code) {
        req.session.code = req.query.code
        res.redirect('/')
    }
    if (!req.session.code) {
        code = ""
        var letters = "0123456789ABCDEF";
        for (var i = 0; i < 32; i++)
            code += letters[(Math.floor(Math.random() * 16))];
        req.session.code = code

    }
    console.log(req.session)
    if (!(req.session.code in db)) {
        console.log("to create new db ")
        db[req.session.code] = { name: req.session.code, data: [] }
    }
    console.log(db[req.session.code])
    let html = '<html><body><div><h1>Backbar Recruiting</h1><h3>Your code:'
    html += db[req.session.code].name + '</h3><ul>'


    for (let i = 0; i < db[req.session.code].data.length; i++) {
        let li = '<li>Data: ' + db[req.session.code].data[i] + '</li>'
        html += li
    }
    html += '</ul>'
    html += "<form method = 'post'><input name='val' type='text'/><button type='submit'>Save entry</button></form>"
    html += '</div></body></html>'
    await res.send(html)

})
app.post('/', (req, res) => {
    console.log("post huselt irev")
    if (req.body) {
        console.log(req.body)
        db[req.session.code].data.push(req.body.val)
    }
    res.redirect('/')
})

app.listen(3030, () => console.log("app is working on port 3030"))