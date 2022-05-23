const fs = require('fs');
const path = require('path');

async function copyDir () {
    const dirPathFrom = path.join(__dirname, 'files');
    const dirPathTo = path.join(__dirname, 'files-copy');

    await fs.promises.mkdir(dirPathTo, {recursive:true});
        
    const filesForDel = await fs.promises.readdir(dirPathTo);

    for (let file of filesForDel) {
        const fileTo = path.join(dirPathTo, file);
        await fs.promises.unlink(fileTo);
    }            

    const filesForCopy = await fs.promises.readdir(dirPathFrom);

    for (let file of filesForCopy) {
        const fileFrom = path.join(dirPathFrom, file);
        const fileTo = path.join(dirPathTo, file);
        await fs.promises.copyFile(fileFrom, fileTo)            
    }

}

copyDir();
