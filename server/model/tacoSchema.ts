const { query } = require('./tacoModel')

console.log(query)

const createTables = (async (): Promise<void> => {
  try {
    await query(`CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    favorite_taco TEXT,
    profile_url TEXT
)`)
  } catch (err) {
    console.log(err)
  }
})()

console.log(createTables)
/*

* user table for storing basic user info
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    favorite_taco TEXT,
    profile_url TEXT
)

* group table (users can belong to multiple groups)
CREATE TABLE groups (
    group_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    creator TEXT NOT NULL
)

* message table (stores all messages for all groups)
CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    poster_id SERIAL FOREIGN KEY,
    group_id SERIAL FOREIGN KEY,
    message TEXT NOT NULL,
    picture_url TEXT,
    created_at TEXT NOT NULL
)

* taco table (stores all recipies)
CREATE TABLE tacos (
    recipe_id SERIAL PRIMARY KEY,
    taco_url TEXT NOT NULL,
    taco_ingredients TEXT NOT NULL,
    taco_instructions TEXT NOT NULL
)

* join table between user and group table
CREATE TABLE user_group (
  user_id SERIAL PRIMARY KEY,
  group_id SERIAL PRIMARY KEY,
  creator TEXT NOT NULL
)

* join table between recipie and group table
CREATE TABLE taco_group (
  recipe_id SERIAL PRIMARY KEY,
  group_id SERIAL PRIMARY KEY,
  created_at TEXT NOT NULL
)

*/
