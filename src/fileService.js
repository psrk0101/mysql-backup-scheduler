import fs from 'fs';

export const makeFolder = (dir) => {
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
}

export const removeFolder = (dir) => {
    fs.rmSync(dir, { recursive: true, force: true });
}
