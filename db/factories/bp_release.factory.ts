import { setSeederFactory } from 'typeorm-extension';

import { BeatportRelease } from 'src/data-retriever/entities/beatport/bp_release.entity';

import fs from 'fs';

import { parse } from 'csv-parse';

// Read data from CSV file and return a promise
const readCSVFile = (filePath) => {
    const results = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(parse())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  };

  export default setSeederFactory(BeatportRelease, async () => {

    const csvData = await readCSVFile('csv_files/bp_release.csv');
  
    // Use the CSV data to populate the properties of the release object
    const release = new BeatportRelease();
    release.releaseId = csvData[0].release_id; // Assuming 'releaseId' is a column name in your CSV file
    release.releaseTitle = csvData[0].release_title; 
    release.releaseDate = new Date(csvData[0].release_date); 
    release.releaseUrl = csvData[0].release_url; 
    release.labelId = csvData[0].label_id; 
    release.updatedOn = new Date(csvData[0].updated_on); 
  
    return release;
  });
