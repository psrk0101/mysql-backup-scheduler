import cron from 'node-cron';
import { schedule } from '../config/config.js';
import { dump } from './dump-processor.js';
import { uploadFile } from './file-transfer.js';
import app from 'app-root-path';


export function run(){
    const date = new Date();
    const files = dump(date);
    files.map(x => {
        uploadFile(x);
    })
    // cron.schedule(schedule, () => {
    
    // })
}