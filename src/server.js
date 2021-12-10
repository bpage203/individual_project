// Load the modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const axios = require('axios');
const qs = require('query-string');
var pgp = require('pg-promise')();
const dev_dbConfig = {
	host: 'db',
	port: 5432,
	database: process.env.POSTGRES_DB,
	user:  process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD
};
const isProduction = process.env.NODE_ENV === 'production';
const dbConfig = isProduction ? process.env.DATABASE_URL : dev_dbConfig;
if (isProduction) {
  pgp.pg.defaults.ssl = {rejectUnauthorized: false};
}
const db = pgp(dbConfig);

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/'));

// loads main page
app.get('/', function(req, res) {
  res.render('pages/main', {
    my_title: "Project Home",
    items: '',
    error: false,
    message: ''
  });
});

// loads reviews page
app.get('/1', function(req, res) {
  res.render('pages/reviews', {
    my_title: "Project Reviews",
    items: '',
    error: false,
    message: ''
  });
});

// updates cocktail card with info from api
app.post('/get_feed', function(req, res) {
  var cocktail = req.body.cocktail;
  if(title) {
    axios({
      url: `www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`,
        method: 'GET',
        dataType:'json',
      })
        .then(item => {
        	console.log(items.data.results);
          res.render('views/pages/main',{
            my_title: "Project Home",
            item: item.data.results,
            error: false
    			})
        })
        .catch(error => {
          console.log(error);
          res.render('views/pages/main',{
            my_title: "Project Home",
            item: '',
            error: true,
            message: error
          })
        });
  }
});

// send review from modal to database
app.post('/post_review', function(req, res) {
	var insert_statement = "INSERT INTO cocktails (reviews) VALUES('" + req.body.review + "') WHERE cocktail_name=" + req.body.cocktail + ";";

	db.task('get-everything', task => {
        return task.batch([
            task.any(insert_statement),
        ]);
    })
    .then(info => {
    	res.render('views/pages/main',{
				my_title: "Project Home",
				item: '',
				error: false
			})
    })
    .catch(err => {
            console.log('error', err);
            res.render('views/pages/main', {
							my_title: "Project Home",
							item: '',
							error: true,
							message: error
            })
    });
});

// gets reviews from database about specific cocktail
app.get('/get_reviews', function(req, res) {
	var request_statement = "SELECT * FROM cocktails WHERE cocktail_name=" + req.body.cocktail + ";";

	db.task('get-everything', task => {
        return task.batch([
            task.any(insert_statement),
        ]);
    })
    .then(info => {
    	res.render('views/pages/main',{
				my_title: "Project Home",
				reviews: info[1],
				review_dates: info[2],
				error: false
			})
    })
    .catch(err => {
            console.log('error', err);
            res.render('views/pages/main', {
							my_title: "Project Home",
							reviews: '',
							review_dates: '',
							error: true,
							message: error
            })
    });
});

app.listen(3000);
console.log('3000 is the magic port');
