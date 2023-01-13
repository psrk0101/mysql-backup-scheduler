import mysqldump from 'mysqldump';
import cron from 'node-cron';
import { databases, schedule } from './config.js';
import fs from 'fs'

const dumpLocation = './dump/'
const makeFolder = (dir) => {
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

cron.schedule(schedule, () => {
    databases.forEach(x => {
        const date = new Date()
        let path = dumpLocation + date.getDate() + '/' + date.getMinutes();
        makeFolder(path);
        x.dumpToFile = path + '/' + x.dumpFileName
        mysqldump(x)
    })
})
