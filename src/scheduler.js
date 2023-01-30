import cron from 'node-cron';
import { schedule } from './config/config.js';
import { dump } from './dumpService.js';
import { uploadFile } from './awsService.js';
import { getDatabases } from './mysql-connector.js';
import { dumpLocation } from './config/config.js';
import { removeFolder } from './fileService.js';

const pathFormat = (date) => {
	let dateFormat2 = date.getFullYear() +
		'/' + ( (date.getMonth()+1) < 9 ? "0" + (date.getMonth()+1) : (date.getMonth()+1) )+
		'/' + ( (date.getDate()) < 9 ? "0" + (date.getDate()) : (date.getDate()) );
        // '/' + ( (date.getMinutes()) < 9 ? "0" + (date.getMinutes()) : (date.getMinutes()) );
	return dateFormat2;
}

export async function run(){
    cron.schedule(schedule, () => {
        const date = new Date();
        let path = dumpLocation + pathFormat(date) + '/';
        getDatabases().then(async databases => {
            const files = await dump(path, databases);
            const promises = files.map(file => uploadFile(file));
            await Promise.all(promises);
            removeFolder(dumpLocation);
        })
    })
}