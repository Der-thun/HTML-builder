const fs = require('fs');
const path = require('path');

function copyDir () {
    const dirPathFrom = path.join(__dirname, 'files');
    const dirPathTo = path.join(__dirname, 'files-copy');

    fs.open(dirPathTo, err => {
        if (err) {
            fs.mkdir(dirPathTo, err => {
                if (err) throw err;
            });           
        }    

        fs.readdir(dirPathTo, (err, files) => {
            files.forEach(file => {
                const fileTo = path.join(dirPathTo, file);                    
                fs.promises.unlink(fileTo)
            })
        })

        fs.readdir(dirPathFrom, (err, files) => {
            files.forEach(file => {
                const fileFrom = path.join(dirPathFrom, file);
                const fileTo = path.join(dirPathTo, file);
                fs.promises.copyFile(fileFrom, fileTo)
            })
        })

    })
}

copyDir();
