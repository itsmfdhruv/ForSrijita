import express from "express";
import pg from "pg" ;
const app = express();
const port = 3000;
app.use(express.static("public"));

// Setup the MySQL database connection
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "5432",
    port: 5432,
  });

  db.connect();

app.get("/", async (req, res) => {
    try {
        // Query to fetch the username and secret
        const { rows } = await db.query('SELECT username, secret FROM confessions');
        
        if (rows.length > 0) {
            var randomIdx = Math.floor(Math.random() * rows.length);
            res.render("index.ejs", { user: rows[randomIdx].username, secret: rows[randomIdx].secret });
        } else {
            res.status(404).send("No secrets found!");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

app.listen(port, () => {
    console.log(`Your server is listening at ${port}`);
});

