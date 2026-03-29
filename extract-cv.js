const fs = require('fs');
const pdf = require('pdf-parse');

async function extract() {
  try {
    const dataBuffer = fs.readFileSync('cv.pdf');
    const data = await pdf(dataBuffer);
    fs.writeFileSync('cv-output.txt', data.text);
    console.log('Success');
  } catch(e) {
    console.error(e);
  }
}
extract();
