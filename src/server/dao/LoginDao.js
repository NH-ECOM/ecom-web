const pg = require('pg');

const pool = new pg.Pool({
  user: 'postgres',
  database: 'ecom_db',
  password: 'admin',
  host: 'localhost',
  port: 5432,
  max: 10,
});

const LoginDao = {
  validateSignIn: async (request, response) => {
    pool.connect((err, db, done) => {
      if (err) {
        console.log('error in connecting');
        console.log(err);
        return 'ERROR';
      } else {
        db.query('select * from public.users', (err, table) => {
          done();
          if (err) {
            console.log('error in running query');
            console.log(err);
            return 'ERROR';
          } else {
            console.log('Table result');
            console.log(table);
            return 'SUCCESS';
          }
        });
      }
    });
  },

  async validateSignIn2(userName, userPass) {
    console.log(pool);
    pool.connect((err, db, done) => {
      if (err) {
        console.log('error in connecting');
        console.log(err);
        return 'ERROR';
      } else {
        db.query(
          `select * from public.users where user_name=${userName} and user_pass =${userPass} `,
          err,
          (table) => {
            done();
            if (err) {
              console.log('error in running query');
              console.log(err);
              return 'ERROR';
            } else {
              console.log(table);
              return 'SUCCESS';
            }
          }
        );
      }
    });
  },
};

module.exports = LoginDao;
