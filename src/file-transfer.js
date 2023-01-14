import AWS from 'aws-sdk';
import fs from 'fs';
import app from 'app-root-path';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region : process.env.AWS_REGION
});

export const uploadFile = (fileName) => {
    const fileContent = fs.readFileSync(fileName);
    const key = fileName.replace(app.path + '/', '')
    const params = {
        Bucket : process.env.AWS_BUCKET_NAME,
        Key: key, //fileName
        Body: fileContent
    }
    s3.upload(params, function(err, data){
        if(err) throw err;
        console.log(`file uploaded success. ${data.Location}`)
    })
}