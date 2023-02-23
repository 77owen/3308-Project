var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();

let config =
    {
        host: 'localhost', //where to display
        user: 'root', //user for connection
        password: 'Ironman7', //password for connection
        database: 'mydb' //database name
    };

module.exports = config;

var db = pgp(config);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));


app.post('/home', function(req, res) {
	var firstname = req.body.firstName;
    var lastname = req.body.lastName;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    // SQL statement to insert player information
    var insert_statement = `INSERT INTO UserInfo (FirstName, LastName, Email, Username, Password) VALUES('${firstname}', '${lastname}', '${email}', '${username}}', '${password}');`;

	db.any(insert_statement)
        .then(function (info) {
            res.render('pages/home',{
                username: '',
                user: ''
			})

        })
        .catch(function (err) {
            console.log('error', err);
            res.render('pages/home', {
                username: '',
                user: ''
            })
        })
});

app.get('/home', function(req, res) {
    var user_name = req.body.usn;
    var password = req.body.psw;
    // SQL statement to insert player information
    var find_user = `SELECT * FROM UserInfo WHERE Username = '${user_name}' AND Password = '${password}'`;

	db.any(find_user)
        .then(function (info) {
            res.render('pages/home',{
                username: user_name,
                user: info[0]
			})

        })
        .catch(function (err) {
            console.log('error', err);
            res.render('pages/home', {
                username: '',
                user: ''
            })
        })
});

app.listen(3000);
console.log('3000 is the magic port');