const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session');

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({ secret: "Julia" }));

let db = {};

app.get('/', async (req, res) => {
    if (req.query.code) {
        req.session.code = req.query.code
        res.redirect('/')
    }
    if (!req.session.code) {
        //generating 32 character lowercase hexadecimal random code
        code = ""
        var letters = "0123456789ABCDEF";
        for (var i = 0; i < 32; i++)
            code += letters[(Math.floor(Math.random() * 16))];
        req.session.code = code

    }
    if (!(req.session.code in db)) {
        //creating new code in db
        db[req.session.code] = { name: req.session.code, data: [] }
    }

    let html = "<html><body><div><h1>Backbar Recruiting</h1><h3>Your code: <a href='/'>"
    html += db[req.session.code].name + "</a></h3><ul>"

    db[req.session.code].data.forEach(li => { html += "<li>Data: " + li + "</li>" })

    html += "</ul><form method = 'post'>New: <input name='val' type='text'/><button type='submit'>Save entry</button></form></div></body></html>"
    await res.send(html)

})
app.post('/', (req, res) => {

    if (req.body.val == "") {
        res.send("Empty entry! to return <a href='/'>Click me!</a>")
    }
    else if (db[req.session.code].data.includes(req.body.val)) {
        res.send("Duplicated entry! to return <a href='/'>Click me!</a>")
    }
    else {
        db[req.session.code].data.push(req.body.val)
        db[req.session.code].data.sort()
        res.redirect('/')
    }
})

app.listen(3030, () => console.log("app is working on port 3030"))