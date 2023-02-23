//
//
//
const express = require('express'); //Ensure our express framework has been added
const app = express();
const bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const axios = require('axios');
const qs = require('query-string');
//
//
// configuration for database
var dark=false;
var pgp = require('pg-promise')();

const dbConfig = process.env.DATABASE_URL;
pgp.pg.defaults.ssl = {rejectUnauthorized: false};

var db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/views/pages/assets'));
//
//
//

//only include local_css if you have local css to use

var user_name = '';

app.get('/', function(req, res) {
	res.render(__dirname + '/views/pages/home', {
	//local_css: "",
	my_title: "Home",
    username: user_name,
    dark: dark,
    message: ''
	//probably need a darkmode: '' type thing
	})
});

app.get('/home', function(req, res) {
	res.render(__dirname + '/views/pages/home', {
	//local_css: "",
	my_title: "Home",
    username: user_name,
    dark: dark,
    message: ''
	//probably need a darkmode: '' type thing
	})
});

app.get('/cart', function(req, res) {
	res.render(__dirname + '/views/pages/cart', {
	//local_css: "",
	my_title: "Cart",
    username: user_name,
    dark: dark,
    message: ''
	//probably need a darkmode: '' type thing
	})
});

app.get('/schedule', function(req, res) {
	res.render(__dirname + '/views/pages/schedule', { 
	//local_css: "",
	my_title: "Schedule",
    username: user_name,
    dark: dark,
    message: ''
	//probably need a darkmode: '' type thing
	})
});

app.get('/logout', function(req, res) {
    user_name = '';
	res.render(__dirname + '/views/pages/login', { 
	//local_css: "",
	my_title: "Logout",
    username: '',
    dark: dark,
    message: ''
	//probably need a darkmode: '' type thing
	})
});

app.get('/login', function(req, res) {
	res.render(__dirname + '/views/pages/login', { 
	//local_css: "",
	my_title: "Login",
    username: user_name,
    dark: dark,
    message: ''
	//probably need a darkmode: '' type thing
	})
});



app.post('/login', function(req, res) {
    var usn = req.body.usn;
    var psw = req.body.psw;
    var msg = "";
    console.log(usn);
    // SQL statement to find player in database
    var find_user = `SELECT * FROM userinfo WHERE username = '${usn}' AND password = '${psw}'`;
        db.any(find_user)
            .then(function (info) {
                if (!info[0])
                {
                    user_name = ""
                    msg = "Error. Username or password incorrect."
                }
                else
                {
                    user_name = usn;
                }
                res.render(__dirname + '/views/pages/login',{
                    username: user_name,
                    my_title: "Login",
                    dark: dark,
                    message: msg
                })

            })
            .catch(function (err) {
                console.log('error', err);
                res.render(__dirname + '/views/pages/login', {
                    username: '',
                    my_title: '',
                    dark: dark,
                    message: msg
                })
            })
});

app.post('/createaccount', function(req, res) {
	var firstname = req.body.firstName;
    var lastname = req.body.lastName;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    // SQL statement to insert player information
    var insert_statement = `INSERT INTO userinfo (firstname, lastname, email, username, password) VALUES('${firstname}', '${lastname}', '${email}', '${username}', '${password}');`;
    db.any(insert_statement)
    .then(function (info) {
        res.render(__dirname + '/views/pages/home',{
            my_title: "Login",
            username: user_name,
            dark: dark,
            message: ''
        })

    })
    .catch(function (err) {
        console.log('error', err);
        res.render(__dirname + '/views/pages/login', {
            my_title: '',
            username: '',
            dark: dark,
            message: ''
        })
    })
});


app.post('/dark',function(req,res) {
    dark = !dark;
    return;
})
// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
