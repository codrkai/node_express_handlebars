var express = require('express');
var hbs = require('express-handlebars'); // using express-handlebars and not hbs
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// custom routes
var indexRouter = require('./routes/index');
var moviesRouter = require('./routes/movies');

// set express
const app = express();

// set middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// set routes
app.use('/', indexRouter);
app.use('/movies', moviesRouter);

// set view engine (handlebars)
app.engine('hbs', hbs({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: require('./components/hbsHelpers.js'),
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});
