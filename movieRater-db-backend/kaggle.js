const fs = require("fs");
const path = require("path");
const axios = require("axios");
const unzipper = require("unzipper");
const csv = require("csv-parser");

// Dataset details for our API endpoint
const datasetOwner = "blondedman";
const datasetName = "the-criterion-collection";

// Output folder path
const outputDir = path.join(__dirname, "data")
// Output zip archive file path 
const zipFilePath = path.join(outputDir, `${datasetName}.zip`);
// Folder where CSVs will be extracted
const extractPath = path.join(outputDir, datasetName);


// Function to fetch and download dataset
const fetchKaggleData = async () => {
  try {
    console.log("Starting dataset download...");

    // Dynamically locate and parse the API credentials from the configuration file 
    // and define them as the following variables
    const kagglePath = path.resolve(__dirname, "config", "kaggle.json");
    const kaggleKey = JSON.parse(fs.readFileSync(kagglePath, "utf-8"));

    // Check to see if the output directory exists 
    if (!fs.existsSync(outputDir)) {
      // and if it doesn't we create the output directory folder 
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Make the request to Kaggle API to download the dataset
    const response = await axios({
      method: "get",
      url: `https://www.kaggle.com/api/v1/datasets/download/${datasetOwner}/${datasetName}`,
      auth: {
        username: kaggleKey.username,
        password: kaggleKey.key,
      },
      responseType: "stream", // Ensure we're streaming the file
    });

    // Stream response data into a file
    const writer = fs.createWriteStream(zipFilePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish",  async () => {
        console.log(`Dataset downloaded successfully and saved to ${zipFilePath}`);
              // Try unzipping the dataset by calling the "unzipDataset" function below
              try {
                const extractedFiles = await unzipDataset();
                resolve({ zipFilePath, extractedFiles });
              } catch (err) {
                reject(err);
              }
      });

      writer.on("error", (err) => {
        console.error("Error saving the file:", err);
        reject(err);
      });
    });
  } catch (error) {
    console.error("Error fetching and downloading Kaggle data:", error.response ? error.response.data : error.message);
    throw new Error("Failed to download data from Kaggle");
  }
};

// Function to unzip the downloaded dataset
const unzipDataset = async () => {
  try {
    console.log("Unzipping dataset...");

    if (!fs.existsSync(zipFilePath)) {
      throw new Error("Zip file does not exist. Ensure the dataset is downloaded first.");
    }

    // Ensure extraction directory exists
    if (!fs.existsSync(extractPath)) {
      fs.mkdirSync(extractPath, { recursive: true });
    }

    return new Promise((resolve, reject) => {
      // Creating a stream to effectively pipe  data from the dataset zip file, 
      // into another stream/destination - and in this case our 
      fs.createReadStream(zipFilePath)
        .pipe(unzipper.Extract({ path: extractPath }))
        .on("close", async () => {
          console.log(`Dataset extracted successfully to ${extractPath}`);
          //putting the files from the extracted zip archive that have been 
          // read and then returned as an array of file or folder names in the "files" var
          const files = fs.readdirSync(extractPath);
          console.log("Extracted Files:", files);
          resolve(files);
        })
        .on("error", (err) => {
          console.error("Error extracting dataset:", err);
          reject(err);
        });
    });
  } catch (error) {
    console.error("Error unzipping dataset:", error);
    throw new Error("Failed to unzip dataset.");
  }
};

const extractedPath = path.join(__dirname, "data", datasetName); // Path to the extracted files

// Function to find the CSV file in the extracted folder
const getCsvFilePath = () => {
  const files = fs.readdirSync(extractedPath);
  const csvFile = files.find((file) => file.endsWith(".csv")); // Look for a CSV file

  if (!csvFile) {
    throw new Error("No CSV file found in extracted dataset!");
  }

  return path.join(extractedPath, csvFile);
};

// Function to parse CSV and return JSON data
const parseCsvToJson = async () => {
  return new Promise((resolve, reject) => {
    const results = [];
    const csvFilePath = getCsvFilePath();

    fs.createReadStream(csvFilePath)
      .pipe(csv()) // Use csv-parser to convert CSV to JSON
      .on("data", (data) => results.push(data)) // Push each row into results array
      .on("end", () => resolve(results)) // Return the JSON data
      .on("error", (error) => reject(error));
  });
};

module.exports = { fetchKaggleData, unzipDataset, parseCsvToJson };
