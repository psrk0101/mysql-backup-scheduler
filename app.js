import mysqldump from 'mysqldump';
import { databases } from './config';
import fs from 'fs';

const dumpLocation = './dump/';
const makeFolder = (dir) => {
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir)
    }
}

databases.forEach(x => {
    let path = dumpLocation + new Date().getDate();
    makeFolder(path);
    x.dumpToFile = path + '/' + x.dumpToFile
    mysqldump(x);
})