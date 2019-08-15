const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session');
const port = process.env.PORT || 3000
const app = express()

//init the app
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({ secret: "Julia" }));
app.use(express.static(__dirname));

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

    let html = "<html><head><style>ul {list-style-type:none; padding :0px; margin :0px;} body {color: #254572;  text-align:center; margin:auto; padding:30px;} .data, .save{cursor: pointer; border-color: #254572;color: #254572;padding :5px; margin :0px; border-radius:5px;} .data:hover {background-color: #7ec5b9;border-color: #7ec5b9;color: white;} a:link, a:visited{color: #254572;} a:hover{color:#7ec5b9}</style></head><body><div><img src = '/logo.png' alt='backbarLogo'><h3>Your code: <a href='/'>"
    html += db[req.session.code].name + "</a></h3><ul>"

    db[req.session.code].data.forEach((data, index) => { html += "<li><form method='post' action='/delete/" + index + "'><button class='data'>Data: " + data + "</button></form></li>" })

    html += "</ul><form method = 'post'>New: <input class ='save' name='val' type='text'/><button class='save' type='submit'>Save entry</button></form></div></body></html>"
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
app.post('/delete/:index', (req, res) => {
    console.log("delete clicked")
    console.log(req.params.index)
    db[req.session.code].data.splice(req.params.index, 1)
    res.redirect('/')
})

app.listen(port, () => console.log("app is working on port " + port))