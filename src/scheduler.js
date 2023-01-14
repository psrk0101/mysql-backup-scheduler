import cron from 'node-cron';
import { schedule } from '../config/config.js';
import { dump } from './database-dump-processor.js';

export function run(){
    const date = new Date();
    dump(date);
    // cron.schedule(schedule, () => {
    
    // })
}