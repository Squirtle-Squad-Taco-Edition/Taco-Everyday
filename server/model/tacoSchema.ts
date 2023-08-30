const { query } = require('./tacoModel');

const createTables = (async (): Promise<void> => {
  try {
    await query(`CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT,
        favorite_taco TEXT,
        profile_url TEXT
    );`)

    await query(`CREATE TABLE groups (
        group_id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        creator TEXT NOT NULL,
        created_at TEXT NOT NULL
    );`)

    await query(`CREATE TABLE messages (
        message_id SERIAL PRIMARY KEY,
        poster_id INTEGER,
        group_id INTEGER,
        message TEXT NOT NULL,
        picture_url TEXT,
        created_at TEXT NOT NULL,
        FOREIGN KEY (poster_id) REFERENCES users (user_id),
        FOREIGN KEY (group_id) REFERENCES groups (group_id)
    );`)

    await query(`CREATE TABLE tacos (
        recipe_id SERIAL PRIMARY KEY,
        taco_url TEXT NOT NULL,
        created_at TEXT NOT NULL
    );`)

    await query(`CREATE TABLE user_group (
        user_id SERIAL,
        group_id SERIAL,
        PRIMARY KEY (user_id, group_id),
        FOREIGN KEY (user_id) REFERENCES users (user_id),
        FOREIGN KEY (group_id) REFERENCES groups (group_id)
    );`)

    await query(`CREATE TABLE taco_group (
      recipe_id SERIAL,
      group_id SERIAL,
      PRIMARY KEY (recipe_id, group_id),
      FOREIGN KEY (recipe_id) REFERENCES tacos (recipe_id),
      FOREIGN KEY (group_id) REFERENCES groups (group_id)
  );`)
  } catch (err) {
    console.log(err)
  }
})()

console.log(createTables)
