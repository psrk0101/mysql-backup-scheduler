import AWS from 'aws-sdk';
import fs from 'fs';
import { dumpLocation } from './config/config.js';

const bucketName = process.env.AWS_BUCKET_NAME;

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region : process.env.AWS_REGION
});

const deleteS3Files = async (filterKey) => {
    const res = await s3.listObjectsV2({
        Bucket: bucketName
      }).promise();
      
    const items = res.Contents.filter(item => item.Key.endsWith(filterKey));
    const targetNumberOfFile = process.env.NUMBER_OF_BACKUP_FILES
    if(items.length > targetNumberOfFile){
        items.reverse()
        let deleteFiles = [];
        for (let i = targetNumberOfFile ; i < items.length; i++) {
            deleteFiles.push({Key: items[i].Key})
        }
        const options = {
            Bucket: bucketName,
            Delete: {
              Objects: deleteFiles
            },
        };
        
        s3.deleteObjects(options, function(err, data){
            if(data){
                console.log("File successfully deleted");
                console.log(data)
            } else {
                console.log("Check with error message " + err);
            }
        });
    }
}

export function uploadFile(fileName){
    const fileContent = fs.readFileSync(fileName);
    const key = fileName.replace(dumpLocation, '')
    const params = {
        Bucket : bucketName,
        Key: key, //fileName
        Body: fileContent
    }

    return new Promise((resolve, reject) => {
        s3.upload(params, async function(err, data){
            if(err) throw err;
            console.log(`file uploaded success. ${data.Location}`)
            const filterKey = data.key.substring(data.key.lastIndexOf("/"));
            deleteS3Files(filterKey);            
            resolve(fileName)
        })
    });
}