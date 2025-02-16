require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sql = require('mssql');
const { fetchKaggleData } = require("./kaggle");
const { parseCsvToJson } = require("./kaggle"); // Import the function to parse the csv to json 


const { getPool } = require("./db"); // Import the function to get the promise pool

const app = express();

app.use(express.json());
app.use(cors());

// Test base route
app.get("/", (req, res) => {
  res.send("MovieRater DB API is running!");
});

// Route to fetch, download, and unzip Kaggle data
app.get("/api/fetch-and-download", async (req, res) => {
  try {
    const result = await fetchKaggleData();
    res.status(200).json({
      message: "Data fetched, downloaded, and extracted successfully",
      extractedFiles: result.extractedFiles,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch, download, or extract data from Kaggle" });
  }
});

// Function to insert only new record sets into the database - 
// if the "spine" number already exists in the database it's going to error out and not add it to the table
const insertDataIntoDatabase = async (dataset) => {
  try {
    const pool = await getPool();

    for (let row of dataset) {
      await pool
        .request()
        .input("spine", sql.Int, row.spine)
        .input("title", sql.VarChar, row.title)
        .input("director1", sql.VarChar, row.director1)
        .input("director2", sql.VarChar, row.director2 || null)
        .input("director3", sql.VarChar, row.director3 || null)
        .input("director4", sql.VarChar, row.director4 || null)
        .input("director5", sql.VarChar, row.director5 || null)
        .input("country", sql.VarChar, row.country || null)
        .input("year", sql.VarChar, row.year || null)
        .query(
          `IF NOT EXISTS (SELECT 1 FROM CriterionFilms WHERE spine = @spine)
          INSERT INTO CriterionFilms (spine, title, director1, director2, director3, director4, director5, country, year) 
          VALUES (@spine, @title, @director1, @director2, @director3, @director4, @director5, @country, @year)`
        );

      console.log(`Inserted: ${row.title} (spine: ${row.spine})`);
    }

    console.log("All records processed!");
  } catch (err) {
    console.error("Error inserting data:", err);
  }
};

// Route/API endpoint to parse CSV and insert data into DB
app.get("/api/parse-and-insert", async (req, res) => {
  try {
    const jsonData = await parseCsvToJson();
    console.log("Parsed Data:", jsonData.slice(0, 5)); // Show first 5 rows for debugging

    await insertDataIntoDatabase(jsonData);
    res.status(200).send("Data successfully parsed and inserted!");
  } catch (err) {
    console.error("Error processing CSV:", err);
    res.status(500).json({ error: "Failed to process CSV and insert into DB" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


//The route/endpoint that fetches ALL current data from the database
app.get("/api/all-movies", async (req, res) => {
  try {
    const pool = await getPool(); // Get the connection pool
    const result = await pool.request().query("SELECT * FROM CriterionFilms"); // Query the database
    res.json(result.recordset); // Send the result as a response
  } catch (err) {
    console.error("Error querying the database:", err); // Log any errors
    res
      .status(500)
      .json({ error: "Database query failed", details: err.message });
  }
});

// Route to fetch a single movie's details 
app.get("/api/movies/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    // Query the database to get the movie details based on the ID
    const result = await pool.request()
      .input("id", sql.Int, movieId)
      .query("SELECT * FROM CriterionFilms WHERE id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Error fetching movie details:", err);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});