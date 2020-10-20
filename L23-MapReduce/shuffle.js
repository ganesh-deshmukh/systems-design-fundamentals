const fs = require('fs');

const HOSTS = process.env.HOSTS.split(',');


for (const host of HOSTS) {
  const fileNames = fs.readdirSync(`${host}/map_result`, 'utf-8');

  for (const fileName of fileNames) {
    
    // remove .txt extension 
    const key = fileName.split('.')[0]; 

    // read contents of file
    const contents = fs.readFileSync(
      `${host}/map_results/${fileName}`,
      'utf-8'
    );

    // write to our final map result at the key, those contents
    fs.appendFileSync(`map_results/${key}.txt`, contents);
  }
}