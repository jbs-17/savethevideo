import jsonfile from 'jsonfile';
import fs from 'node:fs/promises';


function getValues(obj, values = []) {
    // Jika bukan object atau null, tambahkan langsung ke values
    if (typeof obj !== 'object' || obj === null) {
        values.push(obj);
        return values;
    }

    // Iterasi setiap key di object
    for (const key of Object.keys(obj)) {
        const value = obj[key];
        // Jika value adalah object (termasuk array), rekursi
        if (typeof value === 'object' && value !== null) {
            getValues(value, values);
        } else {
            // Jika value bukan object, tambahkan ke values
            values.push(value);
        }
    }

    return values;
}



//const data =await jsonfile.readFile('./tt.json');
const data = await jsonfile.readFile('../temp/tiktok-photo-slide.json');
const z = getValues(data).filter(x => typeof x === 'string' && x.includes('tiktok'));
console.log(z.length);


const vids = ['youtube', 'tiktok', 'facebook', 'instagram']