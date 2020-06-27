let app = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');

const PORT = 3000;

const pool = new pg.Pool({
  user: 'postgres',
  database: 'ecom_db',
  password: 'admin',
  host: 'localhost',
  port: 5432,
  max: 10,
});

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(function (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.listen(PORT, () => {
  console.log('Listening on port : ' + PORT);
});
