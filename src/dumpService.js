import mysqldump from 'mysqldump';
import { makeFolder } from './fileService.js';

export async function dump(path, databases){
    let dumpFiles = new Array();

    for(const [idx, x] of databases.entries()){
        let dumpObj = {
            connection:{
                host: process.env.DATABASE_HOST,
                user: process.env.DATABASE_USER,
                password:process.env.DATABASE_PASSWORD,
                database:x.Database
            },
            dumpFileName:x.Database + '.sql'
        };

        makeFolder(path);
        dumpObj.dumpToFile = path + dumpObj.dumpFileName
        dumpFiles.push(dumpObj.dumpToFile)
        await mysqldump(dumpObj);
    }

    console.log('dump success')
    return dumpFiles;
}