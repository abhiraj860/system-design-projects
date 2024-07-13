const fs = require('fs');
const path = require('path');

// Define file paths
const inputFilePath = path.resolve(__dirname, 'data.txt');
const outputFilePath = path.resolve(__dirname, 'output.json');

console.log(`Reading from file: ${inputFilePath}`);

// Create a readable stream for input file
const readStream = fs.createReadStream(inputFilePath, { encoding: 'utf8' });

// Create a writable stream for output file
const writeStream = fs.createWriteStream(outputFilePath, { encoding: 'utf8' });

let jsonString = '';

// Read the large JSON string in chunks
readStream.on('data', (chunk) => {
  jsonString += chunk;
});

// Handle end of the read stream
readStream.on('end', () => {
  try {
    // Parse the complete JSON string
    const jsonObject = JSON.parse(jsonString);

    // Write the parsed JSON object to the output file
    writeStream.write(JSON.stringify(jsonObject, null, 2));

    console.log(`Conversion completed. JSON data written to file: ${outputFilePath}`);
  } catch (error) {
    console.error('Error parsing JSON:', error.message);
  } finally {
    writeStream.end();
  }
});

// Handle errors
readStream.on('error', (err) => {
  console.error('Read stream error:', err);
});

writeStream.on('error', (err) => {
  console.error('Write stream error:', err);
});
