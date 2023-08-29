// for server.js
/* eslint-disable import/no-extraneous-dependencies */
const { Pool } = require('pg');

require('dotenv').config();

const { PG_URI } = process.env;

const pool = new Pool({ connectionString: PG_URI });

module.exports = {
  query: (text: string, params: string[]) => {
    console.log('executed query', text);
    console.log('query params', params);
    return pool.query(text, params);
  },
};
