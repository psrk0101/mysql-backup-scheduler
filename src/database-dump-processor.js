import app from 'app-root-path';
import { databases } from '../config/config.js';
import mysqldump from 'mysqldump';
import fs from 'fs';

const dumpLocation = app.path + '/dump/'
const makeFolder = (dir) => {
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

export function dump(d){
    databases.forEach(x => {
        let path = dumpLocation + d.getDate() + '/' + d.getMinutes() + '/';
        makeFolder(path);
        x.dumpToFile = path + x.dumpFileName
        console.log(x)
        mysqldump(x)
       })
}
