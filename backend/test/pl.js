import jsonfile from 'jsonfile';

const videos =  await jsonfile.readFile('./xxx.json');
console.log(JSON.parse(videos));