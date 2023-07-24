const sqlite3 = require('sqlite3').verbose();

const save_buttons = () => {
  let db = new sqlite3.Database(':memory', (err:any) => {
    if (err) { return console.error(err.message) }

    console.log("Connected to an in-memory SQLite database");
  });

  db.close();
}
